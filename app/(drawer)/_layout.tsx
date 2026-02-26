import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="home" options={{ title: "Home" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
      <Drawer.Screen name="appointments" options={{ title: "Appointments" }} />
      <Drawer.Screen name="category-detail" options={{ title: "Category" }} />
    </Drawer>
  );
}