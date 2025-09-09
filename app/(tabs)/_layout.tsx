import { Tabs } from "expo-router";
export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerTitle: "" }}>
            <Tabs.Screen name="index" options={{ title: "Özet" }} />
            <Tabs.Screen name="vitals" options={{ title: "Ölçümler" }} />
        </Tabs>
    );
}
