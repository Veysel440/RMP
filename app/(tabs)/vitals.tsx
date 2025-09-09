import { View, FlatList, Text } from "react-native";
import VitalForm from "@/features/vitals/components/VitalForm";
import { useVitals } from "@/features/vitals/hooks";
import type { Vital } from "@/entities/vital/types";

export default function Vitals() {
    const { data } = useVitals({});
    return (
        <View style={{ flex: 1 }}>
            <VitalForm />
            <FlatList<Vital>
                data={data ?? []}
                keyExtractor={(it) => String(it.id)}
                renderItem={({ item }) => (
                    <View style={{ padding: 12 }}>
                        <Text>{item.type}: {item.value} {item.unit}</Text>
                    </View>
                )}
            />
        </View>
    );
}
