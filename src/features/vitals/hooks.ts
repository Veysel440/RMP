import { useQuery } from "@tanstack/react-query";
import { getVitalsLocal } from "./api";
import type { Vital } from "@/entities/vital/types";

export function useVitals(_: { cursor?: string }) {
    return useQuery<Vital[]>({ queryKey: ["vitals"], queryFn: async () => getVitalsLocal() });
}