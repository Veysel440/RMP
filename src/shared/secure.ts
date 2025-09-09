import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const opts =
    Platform.OS === "ios"
        ? {
            keychainService: "ccare",
            keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
        }
        : {};

export const secure = {
    get: (k: string) => SecureStore.getItemAsync(k),
    set: (k: string, v: string) => SecureStore.setItemAsync(k, v, opts),
    del: (k: string) => SecureStore.deleteItemAsync(k),
};