import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  selectedChildId: string | null;
  setSelectedChildId: (id: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      selectedChildId: null,
      setSelectedChildId: (id) => set({ selectedChildId: id }),
    }),
    {
      name: 'bhc-app-store',
      partialize: (state) => ({ selectedChildId: state.selectedChildId }),
    }
  )
);
