import { Tabs } from "expo-router";
import { useAuth } from "@/shared/state/auth";

export default function TabLayout() {
    const roles = useAuth(s => s.user?.roles ?? []);
    const isClinician = roles.includes("clinician") || roles.includes("admin");

    return (
        <Tabs screenOptions={{ headerTitle: "" }}>
            <Tabs.Screen name="index" options={{ title: "Özet" }} />
            <Tabs.Screen name="vitals" options={{ title: "Ölçümler" }} />
            {isClinician ? null :  null}
        </Tabs>
    );
}
