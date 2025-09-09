import { api } from "@/shared/api/http";
import { idemKey } from "@/shared/random";
import type { Vital } from "@/entities/vital/types";

export async function pullVitals(cursor?: string) {
    return api.get<{ data: Vital[]; next?: string }>("/vitals", { cursor });
}

export async function pushVitals(batch: Vital[]) {
    const key = await idemKey();
    return api.post<{ saved: number }>("/vitals", { batch }, key);
}
