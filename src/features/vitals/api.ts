import { LocalVitals } from "@/entities/vital/repo.local";
export function getVitalsLocal() { return LocalVitals.list(); }
export function addVitalLocal(v: Parameters<typeof LocalVitals.add>[0]) { return LocalVitals.add(v); }
