import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, MapPin, Video, Phone, Award, ChevronRight } from 'lucide-react-native';

// Types
type Advisor = {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
  rating: number;
  totalReviews: number;
  experience: string;
  location: string;
  videoFee: number;
  physicalFee: number;
  tags: string[];
};

// Mock Data
const categoryData = {
  id: '1',
  name: 'Tax Consultants',
  description: 'Expert tax advisors for ITR filing, GST registration, and tax planning',
  totalAdvisors: 24,
};

const advisors: Advisor[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    specialization: 'Senior Tax Consultant',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    rating: 4.8,
    totalReviews: 156,
    experience: '12 years',
    location: 'Bengaluru, KA',
    videoFee: 1500,
    physicalFee: 2500,
    tags: ['ITR Filing', 'GST', 'Tax Planning'],
  },
  {
    id: '2',
    name: 'Priya Sharma',
    specialization: 'Chartered Accountant',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    rating: 4.9,
    totalReviews: 203,
    experience: '8 years',
    location: 'Mumbai, MH',
    videoFee: 1200,
    physicalFee: 2000,
    tags: ['Corporate Tax', 'Audit', 'Compliance'],
  },
  {
    id: '3',
    name: 'Vikram Singh',
    specialization: 'GST Consultant',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    rating: 4.7,
    totalReviews: 89,
    experience: '10 years',
    location: 'Delhi, NCR',
    videoFee: 1000,
    physicalFee: 1800,
    tags: ['GST Registration', 'Returns', 'Compliance'],
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    specialization: 'Tax Planning Expert',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    rating: 4.6,
    totalReviews: 67,
    experience: '6 years',
    location: 'Hyderabad, TS',
    videoFee: 1300,
    physicalFee: 2200,
    tags: ['Tax Saving', 'Investment', 'NRI Tax'],
  },
  {
    id: '5',
    name: 'Ankit Patel',
    specialization: 'Income Tax Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 4.5,
    totalReviews: 45,
    experience: '5 years',
    location: 'Ahmedabad, GJ',
    videoFee: 800,
    physicalFee: 1500,
    tags: ['ITR Filing', 'Refunds', 'Notices'],
  },
];

export default function CategoryDetail() {
  const renderAdvisorCard = ({ item }: { item: Advisor }) => (
    <TouchableOpacity className="bg-card rounded-xl border border-border mb-4 overflow-hidden">
      {/* Header with Avatar */}
      <View className="p-4">
        <View className="flex-row items-start gap-4">
          <View className="w-16 h-16 rounded-xl overflow-hidden border-2 border-border">
            <Image
              source={{ uri: item.avatar }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-foreground mb-1">{item.name}</Text>
            <Text className="text-primary text-sm font-medium mb-2">{item.specialization}</Text>
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <Text className="text-sm font-semibold text-foreground">{item.rating}</Text>
                <Text className="text-xs text-muted-foreground">({item.totalReviews})</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Award size={14} className="text-muted-foreground" />
                <Text className="text-xs text-muted-foreground">{item.experience}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Location */}
        <View className="flex-row items-center gap-2 mt-3 mb-3">
          <MapPin size={14} className="text-muted-foreground" />
          <Text className="text-sm text-muted-foreground">{item.location}</Text>
        </View>

        {/* Tags */}
        <View className="flex-row flex-wrap gap-2 mb-4">
          {item.tags.map((tag, index) => (
            <View
              key={index}
              className="bg-primary/10 px-3 py-1 rounded-full"
            >
              <Text className="text-xs text-primary font-medium">{tag}</Text>
            </View>
          ))}
        </View>

        {/* Consultation Modes & Fees */}
        <View className="flex-row gap-3">
          {/* Video Consultation */}
          <View className="flex-1 bg-muted/50 rounded-lg p-3 border border-border">
            <View className="flex-row items-center gap-2 mb-2">
              <Video size={16} className="text-primary" />
              <Text className="text-xs font-semibold text-foreground">Video Call</Text>
            </View>
            <Text className="text-lg font-bold text-foreground">₹{item.videoFee}</Text>
            <Text className="text-xs text-muted-foreground">per session</Text>
          </View>

          {/* Physical Consultation */}
          <View className="flex-1 bg-muted/50 rounded-lg p-3 border border-border">
            <View className="flex-row items-center gap-2 mb-2">
              <Phone size={16} className="text-primary" />
              <Text className="text-xs font-semibold text-foreground">In-Person</Text>
            </View>
            <Text className="text-lg font-bold text-foreground">₹{item.physicalFee}</Text>
            <Text className="text-xs text-muted-foreground">per session</Text>
          </View>
        </View>
      </View>

      {/* Footer with Book Button */}
      <View className="px-4 pb-4">
        <TouchableOpacity className="bg-primary py-3 rounded-xl items-center flex-row justify-center">
          <Text className="text-primary-foreground font-semibold">Book Consultation</Text>
          <ChevronRight size={20} className="text-primary-foreground ml-1" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4 border-b border-border">
        <View className="flex-row items-center gap-4 mb-4">
          <TouchableOpacity className="w-10 h-10 bg-card rounded-full items-center justify-center border border-border">
            <ArrowLeft size={20} className="text-foreground" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-foreground">{categoryData.name}</Text>
            <Text className="text-sm text-muted-foreground">{categoryData.totalAdvisors} advisors available</Text>
          </View>
        </View>

        {/* Category Description */}
        <View className="bg-primary/5 rounded-xl p-4 border border-primary/10">
          <Text className="text-sm text-foreground leading-relaxed">
            {categoryData.description}
          </Text>
        </View>
      </View>

      {/* Advisors List */}
      <FlatList
        data={advisors}
        renderItem={renderAdvisorCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24, paddingBottom: 128 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-lg font-semibold text-foreground mb-2">No Advisors Found</Text>
            <Text className="text-muted-foreground text-center px-12">
              There are no advisors available in this category at the moment.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}