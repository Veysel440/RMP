import * as Random from "expo-random";
export async function idemKey(): Promise<string> {
    const b = await Random.getRandomBytesAsync(16);
    return Array.from(b, x => x.toString(16).padStart(2, "0")).join("");
}