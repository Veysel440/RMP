import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import dayjs from "dayjs";
import { addVitalLocal } from "../api";

export default function VitalForm() {
    const [value, setV] = useState<string>("");
    function save() {
        const num = Number(value);
        if (Number.isFinite(num)) {
            addVitalLocal({ type: "bp_sys", value: num, unit: "mmHg", taken_at: dayjs().toISOString() });
            setV("");
        }
    }
    return (
        <View style={{ padding: 12, gap: 8 }}>
            <TextInput placeholder="Sistolik (mmHg)" keyboardType="numeric" value={value} onChangeText={setV} />
            <Button title="Kaydet (Yerel)" onPress={save} />
        </View>
    );
}
