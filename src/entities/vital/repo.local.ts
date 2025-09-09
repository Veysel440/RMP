import { db } from "@/shared/db/sqlite";
import { type Vital } from "./types";

export const LocalVitals = {
    list(): Vital[] {
        const rs = db.getAllSync<Vital>("SELECT * FROM vitals ORDER BY datetime(taken_at) DESC");
        return rs;
    },
    add(v: Vital): number {
        const stmt = db.prepareSync("INSERT INTO vitals(type,value,unit,taken_at,note) VALUES (?,?,?,?,?)");
        const r = stmt.executeSync([v.type, v.value, v.unit, v.taken_at, v.note ?? null]);
        return Number(r.lastInsertRowId);
    }
};
