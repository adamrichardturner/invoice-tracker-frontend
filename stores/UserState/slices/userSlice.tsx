import { create, StateCreator } from "zustand";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  profile_image_url?: string;
  created_at?: Date;
  isAuth: boolean;
}

export interface IUserSlice {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createUserSlice: StateCreator<IUserSlice> = (set) => ({
  user: null,
  setUser: (user: User | null) =>
    set(() => ({
      user,
    })),
});

export const useUserStore = create(createUserSlice);
