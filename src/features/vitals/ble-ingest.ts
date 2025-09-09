import { Device } from "react-native-ble-plx";
import { UUID, connectAndDiscover, subscribeCharacteristic } from "@/shared/ble";
import { pushVitals } from "@/features/vitals/sync";

function b64ToBytes(b64: string): Uint8Array {
    const bin = global.atob ? global.atob(b64) : Buffer.from(b64, "base64").toString("binary");
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return arr;
}

export async function startOximeterIngest(dev: Device) {
    const d = await connectAndDiscover(dev);

    const sub = await subscribeCharacteristic(d, UUID.PULSE_OXIMETER_SERVICE, UUID.PLX_CONTINUOUS_MEAS, async (c) => {
        if (!c.value) return;
        const bytes = b64ToBytes(c.value);

        const spo2 = bytes[1] ?? 0;
        const pulse = bytes[2] ?? 0;

        await pushVitals([
            { type: "spo2", value: spo2, unit: "%", taken_at: new Date().toISOString() },
            { type: "hr",   value: pulse, unit: "bpm", taken_at: new Date().toISOString() }
        ]);
    });

    return sub;
}