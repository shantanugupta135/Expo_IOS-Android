import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MapPin, 
  Search, 
  Video, 
  FileText, 
  Shield, 
  CreditCard, 
  Building2,
  ChevronRight,
  TrendingUp,
  Sparkles
} from 'lucide-react-native';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router";
import ProfileMenu from "../ProfileMenu"; 

// Mock Data for Categories
const categories = [
  { id: '1', title: 'ITR Filing', icon: 'FileText', color: 'bg-blue-100 text-blue-600' },
  { id: '2', title: 'Tax Planning', icon: 'TrendingUp', color: 'bg-green-100 text-green-600' },
  { id: '3', title: 'GST Registration', icon: 'Building2', color: 'bg-purple-100 text-purple-600' },
  { id: '4', title: 'Legal Advice', icon: 'Shield', color: 'bg-red-100 text-red-600' },
  { id: '5', title: 'Contracts', icon: 'FileText', color: 'bg-orange-100 text-orange-600' },
  { id: '6', title: 'Property', icon: 'Building2', color: 'bg-teal-100 text-teal-600' },
  { id: '7', title: 'Family Law', icon: 'Shield', color: 'bg-pink-100 text-pink-600' },
  { id: '8', title: 'Finance', icon: 'CreditCard', color: 'bg-indigo-100 text-indigo-600' },
];

// Mock Data for Quick Actions
const quickActions = [
  { id: '1', title: 'Book Physical', subtitle: 'Visit in office', icon: 'Building2', color: 'bg-blue-500' },
  { id: '2', title: 'Video Consult', subtitle: 'Connect instantly', icon: 'Video', color: 'bg-indigo-500' },
  { id: '3', title: 'Financial Advisory', subtitle: 'Plan investments', icon: 'TrendingUp', color: 'bg-emerald-500' },
  { id: '4', title: 'ITR Filing', subtitle: 'FY 2025-26', icon: 'FileText', color: 'bg-orange-500' },
];

// Helper to get icon component
const getIcon = (name: string, color: string) => {
  const iconProps = { size: 24, className: color };
  switch (name) {
    case 'FileText': return <FileText {...iconProps} />;
    case 'TrendingUp': return <TrendingUp {...iconProps} />;
    case 'Building2': return <Building2 {...iconProps} />;
    case 'Shield': return <Shield {...iconProps} />;
    case 'Video': return <Video {...iconProps} />;
    case 'CreditCard': return <CreditCard {...iconProps} />;
    default: return <FileText {...iconProps} />;
  }
};

export default function Home() {
   const router = useRouter();
   const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <View className="flex-row items-center justify-between mb-4">
            {/* PROFILE ICON → OPEN DRAWER */}
           <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="w-10 h-10 rounded-full bg-card border border-border items-center justify-center"
            >
            <ProfileMenu size={20} />
          </TouchableOpacity>
            {/* Location Selector */}
            <View className="flex-row items-center gap-2">
              <MapPin size={20} className="text-primary" />
              <View>
                <Text className="text-xs text-muted-foreground">Location</Text>
                <Text className="text-sm font-semibold text-foreground flex-row items-center">
                  Bengaluru, KA
                  <ChevronRight size={16} className="text-muted-foreground ml-1" />
                </Text>
              </View>
            </View>
            <ThemeToggle />
          </View>

          {/* Search Bar */}
          <View className="relative">
            <Search size={20} className="absolute left-4 top-3.5 text-muted-foreground" />
            <TextInput
              placeholder="Search advisors, ITR, GST..."
              placeholderTextColor="#94a3b8"
              className="bg-input text-foreground pl-12 pr-4 py-3 rounded-xl border border-border text-base"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mt-4">
          <Text className="text-lg font-bold text-foreground mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap gap-3">
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                 onPress={() =>
                  action.id === "1" ? router.push("/categories") : undefined
                }
                className="flex-1 min-w-[45%] bg-card p-4 rounded-xl border border-border shadow-sm"
              >
                <View className={`w-10 h-10 rounded-full ${action.color} items-center justify-center mb-3`}>
                  {getIcon(action.icon, 'text-white')}
                </View>
                <Text className="font-semibold text-foreground text-sm">{action.title}</Text>
                <Text className="text-xs text-muted-foreground mt-1">{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Browse by Category */}
        <View className="px-6 mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-foreground">Browse by Category</Text>
            <TouchableOpacity>
              <Text className="text-sm text-primary font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat.id} 
                className="w-[23%] items-center py-3"
              >
                <View className={`w-14 h-14 rounded-2xl ${cat.color.split(' ')[0]} items-center justify-center mb-2`}>
                  {getIcon(cat.icon, cat.color.split(' ')[1])}
                </View>
                <Text className="text-xs text-foreground text-center leading-tight">{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promo Strip */}
        <View className="px-6 mt-8">
          <View className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-xl flex-row items-center justify-between">
            <View className="flex-1">
              <View className="flex-row items-center gap-2 mb-1">
                <Sparkles size={16} className="text-yellow-300" />
                <Text className="text-white font-bold text-sm">Ask Legal AI</Text>
              </View>
              <Text className="text-blue-100 text-xs">Get instant answers to your legal queries. First query free!</Text>
            </View>
            <TouchableOpacity className="bg-white/20 px-3 py-2 rounded-lg">
              <Text className="text-white text-xs font-semibold">Try Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recently Viewed */}
        <View className="px-6 mt-8 mb-4">
          <Text className="text-lg font-bold text-foreground mb-4">Recently Consulted</Text>
          
          <View className="gap-3">
            {/* Item 1 */}
            <TouchableOpacity onPress={() => router.push("/advisor-profile")}
            className="bg-card p-4 rounded-xl border border-border flex-row items-center gap-4">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
                <Shield size={24} className="text-blue-600" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-foreground">Rajesh Kumar</Text>
                <Text className="text-sm text-muted-foreground">Corporate Lawyer • 12 yrs exp</Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <Text className="text-xs text-yellow-600">★ 4.8</Text>
                  <Text className="text-xs text-muted-foreground">(120 reviews)</Text>
                </View>
              </View>
              <ChevronRight size={20} className="text-muted-foreground" />
            </TouchableOpacity>

            {/* Item 2 */}
            <TouchableOpacity onPress={() => router.push("/advisor-profile")}
            className="bg-card p-4 rounded-xl border border-border flex-row items-center gap-4">
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center">
                <TrendingUp size={24} className="text-green-600" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-foreground">Priya Sharma</Text>
                <Text className="text-sm text-muted-foreground">Chartered Accountant • 8 yrs exp</Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <Text className="text-xs text-yellow-600">★ 4.9</Text>
                  <Text className="text-xs text-muted-foreground">(85 reviews)</Text>
                </View>
              </View>
              <ChevronRight size={20} className="text-muted-foreground" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}