export type VitalType = "bp_sys" | "bp_dia" | "hr" | "spo2" | "glucose";
export type Vital = { id?: number; type: VitalType; value: number; unit: string; taken_at: string; note?: string };

