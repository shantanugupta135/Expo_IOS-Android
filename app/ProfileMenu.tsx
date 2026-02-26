import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function ProfileMenu() {
  return (
    <View className="flex-1 p-6 bg-background">

      <Text className="text-xl font-bold mb-6">Menu</Text>

      <TouchableOpacity className="py-3" onPress={() => router.push('/profile/details')}>
        <Text>👤 My Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity className="py-3" onPress={() => router.push('/appointments')}>
        <Text>📅 My Appointments</Text>
      </TouchableOpacity>

      <TouchableOpacity className="py-3" onPress={() => router.push('/settings')}>
        <Text>⚙️ Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity className="py-3" onPress={() => router.replace('/login')}>
        <Text className="text-red-500">🚪 Logout</Text>
      </TouchableOpacity>

    </View>
  );
}