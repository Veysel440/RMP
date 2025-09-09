import { useAuth } from "@/shared/state/auth";
const BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://10.0.2.2:8080";

async function refreshToken(refresh?: string) {
    if (!refresh) return;
    const r = await fetch(`${BASE}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh })
    });
    if (!r.ok) return;
    return r.json() as Promise<{ access: string; refresh?: string; user?: any }>;
}

export async function http(
    path: string,
    init?: RequestInit & { idempotency?: string }
): Promise<Response> {
    const { tokens } = useAuth.getState();

    const h = new Headers(init?.headers as HeadersInit | undefined);
    h.set("Accept", "application/json");
    if (init?.body && !h.has("Content-Type")) h.set("Content-Type", "application/json");
    if (tokens.access) h.set("Authorization", `Bearer ${tokens.access}`);
    if (init?.idempotency) h.set("X-Idempotency-Key", init.idempotency);

    const doFetch = () => fetch(BASE + path, { ...init, headers: h });

    let res = await doFetch();
    if (res.status === 401) {
        const refreshed = await refreshToken(tokens.refresh);
        if (refreshed?.access) {
            const s = useAuth.getState();
            await s.setSession(refreshed.user ?? (s.user as any), { access: refreshed.access, refresh: refreshed.refresh ?? s.tokens.refresh });
            h.set("Authorization", `Bearer ${refreshed.access}`);
            res = await doFetch();
        }
    }
    return res;
}

export const api = {
    get: <T=any>(p: string, q?: Record<string, any>) => {
        const url = new URL(BASE + p);
        Object.entries(q ?? {}).forEach(([k,v]) => v!=null && url.searchParams.append(k, String(v)));
        return http(url.pathname + url.search).then(r => r.json() as Promise<T>);
    },
    post: <T=any>(p: string, body: unknown, idemp?: string) =>
        http(p, { method: "POST", body: JSON.stringify(body), idempotency: idemp }).then(r => r.json() as Promise<T>),
};
