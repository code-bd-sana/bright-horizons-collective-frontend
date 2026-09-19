'use client';

import React, { createContext, useContext } from 'react';
import Link from 'next/link';
import { Loader2, UserX, ArrowLeft } from 'lucide-react';
import { useChildProfile } from '../hooks/child-profiles.queries';
import type { ChildProfile } from '../model/child-profile.types';

type ChildProfileDetailContextValue = {
  child: ChildProfile;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

const ChildProfileDetailContext = createContext<ChildProfileDetailContextValue | null>(null);

export function useActiveChild() {
  const context = useContext(ChildProfileDetailContext);
  if (!context) {
    throw new Error('useActiveChild must be used within a ChildProfileDetailProvider');
  }
  return context;
}

export function ChildProfileDetailProvider({
  childId,
  children,
}: {
  childId: string;
  children: React.ReactNode;
}) {
  const { data: child, isLoading, isError, error, refetch } = useChildProfile(childId);

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full min-w-0 max-w-382.25 flex-col gap-6 animate-pulse">
        <div className="h-5 w-48 rounded bg-gray-200" />
        <div className="h-12 w-full rounded-2xl bg-gray-100" />
        <div className="h-44 w-full rounded-2xl bg-gray-100 p-6 flex items-center gap-4">
          <div className="size-20 rounded-2xl bg-gray-200" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-7 w-48 rounded bg-gray-200" />
            <div className="h-4 w-72 rounded bg-gray-200" />
          </div>
        </div>
        <div className="flex min-h-60 items-center justify-center rounded-2xl border border-[#e8ebe8] bg-white">
          <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
        </div>
      </div>
    );
  }

  if (isError || !child) {
    return (
      <div className="mx-auto flex min-h-96 w-full min-w-0 max-w-382.25 flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8ddd9] bg-white p-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-[#fce9e3] text-[#b24b4b]">
          <UserX className="size-8" />
        </div>
        <h2 className="mt-4 font-nunito text-2xl font-semibold text-[#263238]">
          Child Profile Not Found
        </h2>
        <p className="mt-2 max-w-md font-manrope text-sm text-[#7d8488]">
          The child profile you are looking for does not exist or you do not have permission to view
          it.
        </p>
        <Link
          href="/dashboard/child-profiles"
          className="mt-6 flex items-center gap-2 rounded-full bg-[#2f7d7e] px-6 py-2.5 font-nunito text-sm font-medium text-white transition-colors hover:bg-[#276a6b]"
        >
          <ArrowLeft className="size-4" />
          Back to Child Profiles
        </Link>
      </div>
    );
  }

  return (
    <ChildProfileDetailContext.Provider
      value={{
        child,
        isLoading,
        isError,
        error: error ? (error as Error) : null,
        refetch,
      }}
    >
      {children}
    </ChildProfileDetailContext.Provider>
  );
}
