const BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://10.0.2.2:8080";
export const api = (token?: string) => ({
    async get(path: string, q?: Record<string, any>) {
        const url = new URL(BASE + path);
        Object.entries(q ?? {}).forEach(([k, v]) => v!=null && url.searchParams.append(k, String(v)));
        const r = await fetch(url, { headers: { Authorization: token ? `Bearer ${token}` : "" }});
        return r.json();
    },
    async post(path: string, body: unknown) {
        const r = await fetch(BASE + path, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
            body: JSON.stringify(body)
        });
        return r.json();
    }
});

