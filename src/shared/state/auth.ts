import { create } from "zustand";
import { secure } from "@/shared/secure";

type User = { id: string; name: string; roles: string[] };
type Tokens = { access?: string; refresh?: string };
type AuthState = { user?: User; tokens: Tokens; loading: boolean };
type AuthActions = {
    setSession: (u: User, t: Tokens) => Promise<void>;
    clear: () => Promise<void>;
    loadFromSecure: () => Promise<void>;
};

export const useAuth = create<AuthState & AuthActions>((set) => ({
    user: undefined, tokens: {}, loading: true,
    setSession: async (user, tokens) => {
        await secure.set("access", tokens.access ?? "");
        await secure.set("refresh", tokens.refresh ?? "");
        await secure.set("user", JSON.stringify(user));
        set({ user, tokens, loading: false });
    },
    clear: async () => {
        await Promise.all([secure.del("access"), secure.del("refresh"), secure.del("user")]);
        set({ user: undefined, tokens: {}, loading: false });
    },
    loadFromSecure: async () => {
        const [a, r, u] = await Promise.all([secure.get("access"), secure.get("refresh"), secure.get("user")]);
        set({ tokens: { access: a ?? undefined, refresh: r ?? undefined }, user: u ? JSON.parse(u) as User : undefined, loading: false });
    },
}));
