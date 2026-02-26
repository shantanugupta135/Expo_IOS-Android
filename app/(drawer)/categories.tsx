import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { ArrowLeft, Search, FileText, TrendingUp, Building2, Shield, CreditCard } from 'lucide-react-native';

// Mock Data for Categories
const categories = [
  { id: '1', title: 'ITR Filing', icon: 'FileText', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: '2', title: 'Tax Planning', icon: 'TrendingUp', color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  { id: '3', title: 'GST Registration', icon: 'Building2', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  { id: '4', title: 'Legal Advice', icon: 'Shield', color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
  { id: '5', title: 'Contracts', icon: 'FileText', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
  { id: '6', title: 'Property', icon: 'Building2', color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
  { id: '7', title: 'Family Law', icon: 'Shield', color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
  { id: '8', title: 'Finance', icon: 'CreditCard', color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' },
];

// Helper to get icon component
const getIcon = (name: string, colorClass: string) => {
  const [bgClass, textClass] = colorClass.split(' ');
  const iconProps = { size: 28, className: textClass };
  
  switch (name) {
    case 'FileText': return <FileText {...iconProps} />;
    case 'TrendingUp': return <TrendingUp {...iconProps} />;
    case 'Building2': return <Building2 {...iconProps} />;
    case 'Shield': return <Shield {...iconProps} />;
    case 'CreditCard': return <CreditCard {...iconProps} />;
    default: return <FileText {...iconProps} />;
  }
};

export default function CategoriesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4 border-b border-border">
        <View className="flex-row items-center gap-4 mb-4">
          <Link href="/" asChild>
            <TouchableOpacity className="w-10 h-10 bg-card rounded-full items-center justify-center border border-border">
              <ArrowLeft size={20} className="text-foreground" />
            </TouchableOpacity>
          </Link>
          <View className="flex-1">
            <Text className="text-xl font-bold text-foreground">Select Service</Text>
            <Text className="text-sm text-muted-foreground">Choose a category to book</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="relative">
          <Search size={20} className="absolute left-4 top-3.5 text-muted-foreground" />
          <View className="bg-input rounded-xl border border-border pl-12 pr-4 py-3">
            <Text className="text-muted-foreground text-base">Search categories...</Text>
          </View>
        </View>
      </View>

      {/* Categories Grid */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24, paddingBottom: 128 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href="/category-detail" 
              asChild
              className="w-[47%]"
            >
              <TouchableOpacity className="bg-card rounded-2xl border border-border p-5 items-center shadow-sm active:scale-95 transition-transform">
                <View className={`w-16 h-16 rounded-2xl ${cat.color.split(' ')[0]} items-center justify-center mb-3`}>
                  {getIcon(cat.icon, cat.color)}
                </View>
                <Text className="text-foreground font-semibold text-center text-sm leading-tight">
                  {cat.title}
                </Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}