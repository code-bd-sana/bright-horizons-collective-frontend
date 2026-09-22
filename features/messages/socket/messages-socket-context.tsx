'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { io, type Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { messageKeys } from '../message.keys';
import type { Message } from '../model/message.types';
import { getSocketBackendUrl } from './socket-client';

type MessagesSocketContextValue = {
  socket: Socket | null;
  isConnected: boolean;
  joinThread: (threadId: string) => void;
  leaveThread: (threadId: string) => void;
  emitTyping: (threadId: string, isTyping: boolean) => void;
};

const MessagesSocketContext = createContext<MessagesSocketContextValue>({
  socket: null,
  isConnected: false,
  joinThread: () => {},
  leaveThread: () => {},
  emitTyping: () => {},
});

export function MessagesSocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    let isCancelled = false;

    async function initSocket() {
      try {
        const res = await fetch('/api/auth/socket-token', {
          headers: { 'Cache-Control': 'no-store' },
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        const token = data?.token;
        if (!token || isCancelled) return;

        const backendUrl = getSocketBackendUrl();
        const socketInstance = io(`${backendUrl}/messages`, {
          auth: { token },
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionAttempts: 10,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          timeout: 20000,
        });

        socketRef.current = socketInstance;
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
          setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
          setIsConnected(false);
        });

        // Global event: any thread updated (e.g. new message sent in background)
        socketInstance.on('threadUpdated', () => {
          queryClient.invalidateQueries({ queryKey: messageKeys.all });
        });

        // Global event: any thread marked as read
        socketInstance.on('threadRead', () => {
          queryClient.invalidateQueries({ queryKey: messageKeys.all });
        });
      } catch {
        // Socket connection gracefully fails without interrupting regular UI
      }
    }

    initSocket();

    return () => {
      isCancelled = true;
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [queryClient]);

  const joinThread = useCallback((threadId: string) => {
    if (!threadId) return;
    socketRef.current?.emit('joinThread', threadId);
  }, []);

  const leaveThread = useCallback((threadId: string) => {
    if (!threadId) return;
    socketRef.current?.emit('leaveThread', threadId);
  }, []);

  const emitTyping = useCallback((threadId: string, isTyping: boolean) => {
    if (!threadId) return;
    socketRef.current?.emit('typing', { threadId, isTyping });
  }, []);

  return (
    <MessagesSocketContext.Provider
      value={{
        socket,
        isConnected,
        joinThread,
        leaveThread,
        emitTyping,
      }}
    >
      {children}
    </MessagesSocketContext.Provider>
  );
}

export function useMessagesSocket() {
  return useContext(MessagesSocketContext);
}

export type ThreadSocketCallbacks = {
  onNewMessage?: (message: Message) => void;
  onMessagesRead?: (payload: { threadId: string; readerUserId: string }) => void;
  onUserTyping?: (payload: {
    threadId: string;
    userId: string;
    role?: string;
    isTyping: boolean;
  }) => void;
};

export function useThreadSocket(
  threadId: string | null | undefined,
  callbacks?: ThreadSocketCallbacks
) {
  const { socket, isConnected, joinThread, leaveThread, emitTyping } = useMessagesSocket();

  const onNewMessageRef = useRef(callbacks?.onNewMessage);
  const onMessagesReadRef = useRef(callbacks?.onMessagesRead);
  const onUserTypingRef = useRef(callbacks?.onUserTyping);

  useEffect(() => {
    onNewMessageRef.current = callbacks?.onNewMessage;
    onMessagesReadRef.current = callbacks?.onMessagesRead;
    onUserTypingRef.current = callbacks?.onUserTyping;
  });

  useEffect(() => {
    if (!socket || !isConnected || !threadId) return;

    joinThread(threadId);

    const isCurrentThread = (incomingThreadId?: string) => {
      if (!incomingThreadId || !threadId) return false;
      return incomingThreadId.toLowerCase() === threadId.toLowerCase();
    };

    const handleNewMessage = (msg: Message) => {
      if (isCurrentThread(msg?.threadId)) {
        onNewMessageRef.current?.(msg);
      }
    };

    const handleMessagesRead = (payload: { threadId: string; readerUserId: string }) => {
      if (isCurrentThread(payload?.threadId)) {
        onMessagesReadRef.current?.(payload);
      }
    };

    const handleUserTyping = (payload: {
      threadId: string;
      userId: string;
      role?: string;
      isTyping: boolean;
    }) => {
      if (isCurrentThread(payload?.threadId)) {
        onUserTypingRef.current?.(payload);
      }
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('messagesRead', handleMessagesRead);
    socket.on('userTyping', handleUserTyping);

    return () => {
      leaveThread(threadId);
      socket.off('newMessage', handleNewMessage);
      socket.off('messagesRead', handleMessagesRead);
      socket.off('userTyping', handleUserTyping);
    };
  }, [socket, isConnected, threadId, joinThread, leaveThread]);

  const sendTyping = useCallback(
    (isTyping: boolean) => {
      if (threadId) {
        emitTyping(threadId, isTyping);
      }
    },
    [threadId, emitTyping]
  );

  return { isConnected, sendTyping };
}
