import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useAuth } from "@/shared/state/auth";
import { api } from "@/shared/api/http";
import { router } from "expo-router";

export default function Login() {
    const setSession = useAuth(s => s.setSession);
    const [email, setE] = useState(""); const [pw, setP] = useState("");

    async function onLogin() {
        try {
            const res = await api.post<{ access:string; refresh:string; user:{id:string;name:string;roles:string[]} }>("/auth/login", { email, password: pw });
            if (res?.access) {
                await setSession(res.user, { access: res.access, refresh: res.refresh });
                router.replace("/(tabs)");
            } else Alert.alert("Hatalı giriş");
        } catch { Alert.alert("Sunucu hatası"); }
    }

    return (
        <View style={{ padding: 16, gap: 12 }}>
            <TextInput placeholder="E-posta" autoCapitalize="none" onChangeText={setE} />
            <TextInput placeholder="Parola" secureTextEntry onChangeText={setP} />
            <Button title="Giriş" onPress={onLogin} />
        </View>
    );
}
