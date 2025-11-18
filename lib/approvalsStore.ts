"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ApprovalsMap = Record<string, boolean>;

interface ApprovalsState {
  approvals: ApprovalsMap;
  setApproval: (reviewId: string, approved: boolean) => void;
  reset: () => void;
}

export const useApprovalsStore = create<ApprovalsState>()(
  persist(
    (set) => ({
      approvals: {},
      setApproval: (reviewId, approved) =>
        set((state) => ({
          approvals: { ...state.approvals, [reviewId]: approved },
        })),
      reset: () => set({ approvals: {} }),
    }),
    {
      name: "flex-living-approvals", 
    }
  )
);
