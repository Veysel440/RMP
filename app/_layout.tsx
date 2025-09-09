import React, { useEffect } from "react";
import { Stack, SplashScreen } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "@/shared/state/auth";
import { View, ActivityIndicator } from "react-native";

SplashScreen.preventAutoHideAsync().catch(()=>{});
const qc = new QueryClient();

function Gate({ children }: { children: React.ReactNode }) {
    const { loading, user, loadFromSecure } = useAuth();
    useEffect(() => { loadFromSecure().finally(() => SplashScreen.hideAsync()); }, []);
    if (loading) return <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><ActivityIndicator/></View>;
    return <>{children}</>;
}

export default function Root() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={qc}>
                <Gate>
                    <Stack screenOptions={{ headerShown: false }} />
                </Gate>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
