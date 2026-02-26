import { Stack } from "expo-router";
import '@/global.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
      <ThemeProvider>
      <SafeAreaProvider>
    <Stack screenOptions={{ headerShown: false }}>
     <Stack.Screen name="index" />
       {/* First screen */}
      <Stack.Screen name="login" />

      {/* Drawer group */}
      <Stack.Screen name="(drawer)" />

      {/* Optional modal */}
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}