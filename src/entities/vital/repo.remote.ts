import { api } from "@/shared/api/client";
export const RemoteVitals = (token?: string) => ({
    syncPull: (cursor?: string) => api(token).get("/vitals", { cursor }),
    ingest: (batch: any[]) => api(token).post("/vitals", { batch })
});
