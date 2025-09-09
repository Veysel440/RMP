import { create } from "zustand";

type AuthState = { token?: string };
type AuthActions = { setToken: (t?: string) => void };

export const useAuth = create<AuthState & AuthActions>((set) => ({
    token: undefined,
    setToken: (t?: string) => set({ token: t })
}));