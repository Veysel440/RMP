# ChronicCare RMP (React Native + Expo)
Remote patient monitoring for DM/HT/COPD. Offline-friendly client, JWT + refresh, RBAC, cursor-based delta sync, idempotent writes, and BLE-ready scaffold for glucose/oximeter devices.

---

## Tech Stack
- **Mobile:** Expo SDK, Expo Router, TypeScript, TanStack Query v5, Zustand, Zod
- **Native:** Reanimated, Gesture Handler, SecureStore, Random, Notifications, FileSystem, Camera
- **Backend (examples):** Laravel 12 or Go API (DB on server: Oracle/MySQL/Mongo). Mobile uses **HTTP only**.

> Note: Heavy persistence lives on the server DB. The app keeps a lightweight local cache (SQLite/MMKV) only for UX. If you prefer *no* SQLite, use MMKV or in-memory caches.

---

## Requirements
- **Node 20 LTS** (Metro compatible), **PNPM**, Android SDK or Xcode
- Emulator backend URL: `http://10.0.2.2:8080`

---

## One-Shot Bootstrap
```bash
# Use Node 20
nvm install 20 && nvm use 20

# Install deps (from project root)
pnpm install

# Expo libs (if not already installed in your package.json)
pnpm expo install expo-router @tanstack/react-query \
  react-native-gesture-handler react-native-reanimated \
  expo-secure-store expo-random expo-notifications expo-file-system expo-camera

pnpm add zustand zod dayjs
# Optional cache (no SQL): pnpm expo install react-native-mmkv

# Environment var
# PowerShell:
$env:EXPO_PUBLIC_API_URL="http://10.0.2.2:8080"
# bash/zsh:
export EXPO_PUBLIC_API_URL="http://10.0.2.2:8080"
# Run
pnpm start -c
pnpm android   # first native build for Dev Client
# pnpm ios
```
# Project Structure
```bash
app/
  _layout.tsx                # Router + providers
  (auth)/login.tsx
  (tabs)/_layout.tsx
  (tabs)/index.tsx           # Dashboard
  (tabs)/vitals.tsx          # List + create vitals
src/
  shared/
    api/http.ts              # fetch + refresh + X-Idempotency-Key
    state/auth.ts            # Session in SecureStore
    secure.ts                # SecureStore wrapper
    random.ts                # idempotency key generator
  entities/
    vital/types.ts
    vital/repo.local.ts      # lightweight cache (or MMKV alternative)
    vital/repo.remote.ts
  features/
    vitals/api.ts
    vitals/hooks.ts
    vitals/components/VitalForm.tsx
assets/
index.ts
app.json
tsconfig.json
babel.config.js
package.json
```