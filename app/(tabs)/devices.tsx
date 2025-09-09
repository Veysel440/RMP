import React, { useState } from "react";
import { View, Button, FlatList, Text, Alert } from "react-native";
import { Device } from "react-native-ble-plx";
import { scanOnce } from "@/shared/ble";
import { startOximeterIngest } from "@/features/vitals/ble-ingest";

export default function Devices() {
    const [list, setList] = useState<Device[]>([]);

    async function scan() {
        const seen = new Map<string, Device>();
        await scanOnce((d) => { if (d?.id) seen.set(d.id, d); });
        setList(Array.from(seen.values()));
    }

    async function connect(d: Device) {
        try {
            const sub = await startOximeterIngest(d);
            Alert.alert("Connected", "Reading continuous SpO2…");
        } catch (e: any) {
            Alert.alert("BLE error", String(e?.message ?? e));
        }
    }

    return (
        <View style={{ flex: 1, padding: 12 }}>
    <Button title="Scan 8s" onPress={scan} />
    <FlatList
    data={list}
    keyExtractor={(x) => x.id}
    renderItem={({ item }) => (
        <View style={{ paddingVertical: 10 }}>
    <Text>{item.name ?? "(no name)"} — {item.id}</Text>
    <Button title="Connect" onPress={() => connect(item)} />
    </View>
)}
    />
    </View>
);
}
