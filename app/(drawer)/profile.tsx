import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Calendar,
  Clock,
  Star,
  ChevronRight,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  Settings as SettingsIcon,
  Shield,
  Lock,
  Heart,
} from 'lucide-react-native';

// Types
type SavedAdvisor = {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  avatar: string;
};

type ConsultationHistory = {
  id: string;
  advisorName: string;
  specialization: string;
  date: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  mode: 'video' | 'physical';
  amount: number;
};

type SettingItem = {
  id: string;
  icon: any;
  title: string;
  subtitle?: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
};

// Mock Data
const savedAdvisors: SavedAdvisor[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    specialization: 'Tax Consultant',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    specialization: 'Corporate Lawyer',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'Vikram Singh',
    specialization: 'Chartered Accountant',
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60',
  },
];

const consultationHistory: ConsultationHistory[] = [
  {
    id: '1',
    advisorName: 'Rajesh Kumar',
    specialization: 'Tax Consultant',
    date: 'Jan 15, 2025',
    status: 'completed',
    mode: 'video',
    amount: 1500,
  },
  {
    id: '2',
    advisorName: 'Priya Sharma',
    specialization: 'Corporate Lawyer',
    date: 'Jan 20, 2025',
    status: 'upcoming',
    mode: 'physical',
    amount: 2500,
  },
  {
    id: '3',
    advisorName: 'Ankit Patel',
    specialization: 'Financial Advisor',
    date: 'Jan 10, 2025',
    status: 'completed',
    mode: 'video',
    amount: 1000,
  },
];

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const renderSavedAdvisor = ({ item }: { item: SavedAdvisor }) => (
    <TouchableOpacity className="bg-card rounded-xl border border-border p-3 mr-3" style={{ width: 140 }}>
      <View className="w-full h-20 rounded-lg overflow-hidden mb-3">
        <View className="w-full h-full bg-muted" />
      </View>
      <Text className="text-foreground font-semibold text-sm mb-1" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="text-muted-foreground text-xs mb-2" numberOfLines={1}>
        {item.specialization}
      </Text>
      <View className="flex-row items-center gap-1">
        <Star size={12} className="text-yellow-500 fill-yellow-500" />
        <Text className="text-xs text-foreground font-medium">{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderConsultationItem = ({ item }: { item: ConsultationHistory }) => {
    const statusColors = {
      completed: 'bg-green-500/10 text-green-600',
      upcoming: 'bg-blue-500/10 text-blue-600',
      cancelled: 'bg-red-500/10 text-red-600',
    };

    const statusLabels = {
      completed: 'Completed',
      upcoming: 'Upcoming',
      cancelled: 'Cancelled',
    };

    return (
      <TouchableOpacity className="bg-card rounded-xl border border-border p-4 mb-3">
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className="text-foreground font-semibold text-base mb-1">
              {item.advisorName}
            </Text>
            <Text className="text-muted-foreground text-sm mb-2">
              {item.specialization}
            </Text>
            <View className="flex-row items-center gap-2">
              <Calendar size={14} className="text-muted-foreground" />
              <Text className="text-sm text-muted-foreground">{item.date}</Text>
              <View className={`px-2 py-1 rounded-full ${statusColors[item.status]}`}>
                <Text className="text-xs font-medium">{statusLabels[item.status]}</Text>
              </View>
            </View>
          </View>
          <View className="bg-muted rounded-lg p-2">
            {item.mode === 'video' ? (
              <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center">
                <Text className="text-primary text-xs font-bold">V</Text>
              </View>
            ) : (
              <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center">
                <Text className="text-primary text-xs font-bold">P</Text>
              </View>
            )}
          </View>
        </View>
        <View className="flex-row items-center justify-between pt-3 border-t border-border">
          <Text className="text-foreground font-semibold">₹{item.amount}</Text>
          {item.status === 'upcoming' && (
            <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
              <Text className="text-primary-foreground text-sm font-medium">Join Call</Text>
            </TouchableOpacity>
          )}
          {item.status === 'completed' && (
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-primary text-sm font-medium">Book Again</Text>
              <ChevronRight size={16} className="text-primary" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      className="flex-row items-center justify-between py-4 border-b border-border"
      onPress={item.onPress}
      disabled={item.type === 'toggle'}
    >
      <View className="flex-row items-center gap-3 flex-1">
        <View className="w-10 h-10 bg-muted rounded-full items-center justify-center">
          <item.icon size={20} className="text-foreground" />
        </View>
        <View className="flex-1">
          <Text className="text-foreground font-medium text-base">{item.title}</Text>
          {item.subtitle && (
            <Text className="text-muted-foreground text-sm mt-0.5">{item.subtitle}</Text>
          )}
        </View>
      </View>
      {item.type === 'toggle' ? (
        <Switch
          value={item.value}
          onValueChange={() => item.onPress?.()}
          trackColor={{ false: 'rgb(226 232 240)', true: 'rgb(37 99 235)' }}
          thumbColor={item.value ? 'white' : 'white'}
        />
      ) : (
        <ChevronRight size={20} className="text-muted-foreground" />
      )}
    </TouchableOpacity>
  );

  const settings: SettingItem[] = [
    {
      id: '1',
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Push notifications for appointments',
      type: 'toggle',
      value: notificationsEnabled,
      onPress: () => setNotificationsEnabled(!notificationsEnabled),
    },
    {
      id: '2',
      icon: SettingsIcon,
      title: 'Dark Mode',
      subtitle: 'Switch to dark theme',
      type: 'toggle',
      value: darkModeEnabled,
      onPress: () => setDarkModeEnabled(!darkModeEnabled),
    },
    {
      id: '3',
      icon: CreditCard,
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
      type: 'navigation',
      onPress: () => {},
    },
    {
      id: '4',
      icon: Shield,
      title: 'Privacy & Security',
      subtitle: 'Manage your data and security',
      type: 'navigation',
      onPress: () => {},
    },
    {
      id: '5',
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help with your account',
      type: 'navigation',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-foreground">Profile</Text>
          <ThemeToggle />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 128 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View className="bg-card rounded-2xl border border-border p-6 mb-6">
          <View className="flex-row items-center gap-4 mb-4">
            <View className="w-20 h-20 bg-muted rounded-full items-center justify-center overflow-hidden">
              <User size={40} className="text-muted-foreground" />
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-foreground mb-1">Amit Verma</Text>
              <Text className="text-muted-foreground text-base mb-2">+91 98765 43210</Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Edit size={14} className="text-primary" />
                <Text className="text-primary text-sm font-medium">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row items-center gap-2 text-muted-foreground">
            <Mail size={16} />
            <Text className="text-sm">amit.verma@email.com</Text>
          </View>
          <View className="flex-row items-center gap-2 text-muted-foreground mt-2">
            <MapPin size={16} />
            <Text className="text-sm">Bengaluru, Karnataka</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-card rounded-xl border border-border p-4 items-center">
            <Text className="text-2xl font-bold text-foreground mb-1">12</Text>
            <Text className="text-muted-foreground text-sm">Consultations</Text>
          </View>
          <View className="flex-1 bg-card rounded-xl border border-border p-4 items-center">
            <Text className="text-2xl font-bold text-foreground mb-1">5</Text>
            <Text className="text-muted-foreground text-sm">Saved Advisors</Text>
          </View>
          <View className="flex-1 bg-card rounded-xl border border-border p-4 items-center">
            <Text className="text-2xl font-bold text-foreground mb-1">2</Text>
            <Text className="text-muted-foreground text-sm">Upcoming</Text>
          </View>
        </View>

        {/* Saved Advisors */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-foreground">Saved Advisors</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-primary text-sm font-medium">View All</Text>
              <ChevronRight size={16} className="text-primary" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={savedAdvisors}
            renderItem={renderSavedAdvisor}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 12 }}
          />
        </View>

        {/* Consultation History */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-foreground">Consultation History</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-primary text-sm font-medium">View All</Text>
              <ChevronRight size={16} className="text-primary" />
            </TouchableOpacity>
          </View>
          {consultationHistory.map((item) => (
            <View key={item.id}>{renderConsultationItem({ item })}</View>
          ))}
        </View>

        {/* Settings */}
        <View className="bg-card rounded-xl border border-border mb-6">
          <View className="p-4 border-b border-border">
            <Text className="text-lg font-semibold text-foreground">Settings</Text>
          </View>
          <View className="px-4">
            {settings.map(renderSettingItem)}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity className="bg-destructive/10 rounded-xl border border-destructive/20 p-4 items-center justify-center mb-6">
          <View className="flex-row items-center gap-2">
            <LogOut size={20} className="text-destructive" />
            <Text className="text-destructive font-semibold text-base">Logout</Text>
          </View>
        </TouchableOpacity>

        {/* App Version */}
        <Text className="text-center text-muted-foreground text-sm mb-4">
          LitigatorConnect v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}