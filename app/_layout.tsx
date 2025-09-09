import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import React from "react";

const qc = new QueryClient();

export default function Root() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={qc}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Stack screenOptions={{ headerShown: false }} />
                </SafeAreaView>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
