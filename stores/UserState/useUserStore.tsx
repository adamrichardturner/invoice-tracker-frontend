import { create } from "zustand";
import { createUserSlice, IUserSlice } from "./slices/userSlice";

export type IUserStore = IUserSlice;

export const useUserStore = create<IUserStore>()((...a) => ({
  ...createUserSlice(...a),
}));
