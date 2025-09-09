import { View, TextInput, Button, Alert } from "react-native";
import { useAuth } from "@/shared/state/auth";
import { api } from "@/shared/api/client";
import React, { useState } from "react";
import { router } from "expo-router";

export default function Login() {
    const setToken = useAuth(s => s.setToken);
    const [email, setE] = useState(""); const [pw, setP] = useState("");
    async function onLogin() {
        const res = await api().post("/auth/login", { email, password: pw });
        if (res?.token) { setToken(res.token); router.replace("/(tabs)"); }
        else Alert.alert("Giriş başarısız");
    }
    return (
        <View style={{ padding: 16, gap: 12 }}>
            <TextInput placeholder="E-posta" autoCapitalize="none" onChangeText={setE} />
            <TextInput placeholder="Parola" secureTextEntry onChangeText={setP} />
            <Button title="Giriş" onPress={onLogin} />
        </View>
    );
}

