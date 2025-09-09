import { BleManager, Device, Characteristic } from "react-native-ble-plx";

export const ble = new BleManager();

export const UUID = {
    PULSE_OXIMETER_SERVICE: "1822",
    PLX_CONTINUOUS_MEAS:   "2a5f",
    GLUCOSE_SERVICE:       "1808",
    GLUCOSE_MEASUREMENT:   "2a18"
};

export async function scanOnce(onDevice: (d: Device) => void) {
    return new Promise<void>((resolve) => {
        const sub = ble.onStateChange((s) => {
            if (s === "PoweredOn") {
                ble.startDeviceScan(
                    null, { allowDuplicates: false },
                    (e, dev) => { if (!e && dev) onDevice(dev); }
                );
                setTimeout(() => { ble.stopDeviceScan(); sub.remove(); resolve(); }, 8000);
            }
        }, true);
    });
}

export async function connectAndDiscover(device: Device) {
    const d = await device.connect();
    await d.discoverAllServicesAndCharacteristics();
    return ble.devices([d.id]).then(([x]) => x ?? d);
}

export async function subscribeCharacteristic(
    device: Device,
    serviceUUID: string,
    charUUID: string,
    onData: (c: Characteristic) => void
) {
    const s = await device.monitorCharacteristicForService(
        serviceUUID, charUUID,
        (error, char) => { if (!error && char) onData(char); }
    );
    return s;
}
