export type MessageSender = {
  id: string;
  name: string;
  role: string;
  profileImage?: string | null;
};

export type Message = {
  id: string;
  threadId: string;
  senderId: string;
  content?: string | null;
  attachment?: string | null;
  isRead: boolean;
  createdAt: string;
  sender: MessageSender;
};

export type ChildSummary = {
  id: string;
  name: string;
  photoUrl?: string | null;
  ageYears?: number;
  ageMonths?: number;
  age?: number;
};

export type ParentSummary = {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  children?: ChildSummary[];
};

export type AdminSummary = {
  id?: string;
  name: string;
  email?: string;
  profileImage?: string | null;
};

export type MessageThread = {
  id: string;
  parentId: string;
  parent?: ParentSummary;
  admin?: AdminSummary;
  messages: Message[];
  unreadCount?: number;
  createdAt: string;
  updatedAt: string;
};

export type SendMessageInput = {
  threadId?: string;
  content?: string;
  file?: File;
};
