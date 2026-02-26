import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Clock,
  Video,
  User,
  Award,
  CheckCircle,
  ThumbsUp,
  MessageSquare,
  Phone,
  ChevronRight,
  Shield,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useRouter } from "expo-router";

// Types
type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
};

type Review = {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
};

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

type DateSlot = {
  date: string;
  day: string;
  slots: TimeSlot[];
};

// Mock Data
const advisorData = {
  id: '1',
  name: 'Rajesh Kumar',
  specialization: 'Senior Tax Consultant',
  rating: 4.8,
  totalReviews: 156,
  experience: '12 years',
  totalConsultations: 850,
  location: 'Bengaluru, Karnataka',
  bio: 'Expert tax consultant with over 12 years of experience in corporate and personal tax planning. Specialized in GST compliance, income tax returns, and tax optimization strategies. Helped over 500 clients save crores in taxes legally.',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
  consultationFee: {
    video: 1500,
    physical: 2500,
  },
};

const certifications: Certification[] = [
  {
    id: '1',
    title: 'Chartered Accountant',
    issuer: 'ICAI',
    year: '2012',
  },
  {
    id: '2',
    title: 'GST Practitioner',
    issuer: 'CBIC',
    year: '2017',
  },
  {
    id: '3',
    title: 'Certified Financial Planner',
    issuer: 'FPSB India',
    year: '2015',
  },
];

const reviews: Review[] = [
  {
    id: '1',
    userName: 'Amit Sharma',
    rating: 5,
    date: '2 days ago',
    comment: 'Excellent guidance on tax planning. Saved me significant amount on my returns. Highly recommended!',
  },
  {
    id: '2',
    userName: 'Priya Patel',
    rating: 4,
    date: '1 week ago',
    comment: 'Very knowledgeable and patient. Explained complex tax concepts in simple terms. Will consult again.',
  },
  {
    id: '3',
    userName: 'Vikram Singh',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Professional and thorough. The video consultation was convenient and well-structured.',
  },
];

const availableDates: DateSlot[] = [
  {
    date: 'Jan 22',
    day: 'Wed',
    slots: [
      { id: '1', time: '09:00 AM', available: true },
      { id: '2', time: '10:30 AM', available: true },
      { id: '3', time: '02:00 PM', available: false },
      { id: '4', time: '04:00 PM', available: true },
    ],
  },
  {
    date: 'Jan 23',
    day: 'Thu',
    slots: [
      { id: '5', time: '10:00 AM', available: true },
      { id: '6', time: '11:30 AM', available: true },
      { id: '7', time: '03:00 PM', available: true },
      { id: '8', time: '05:00 PM', available: false },
    ],
  },
  {
    date: 'Jan 24',
    day: 'Fri',
    slots: [
      { id: '9', time: '09:30 AM', available: true },
      { id: '10', time: '11:00 AM', available: false },
      { id: '11', time: '02:30 PM', available: true },
      { id: '12', time: '04:30 PM', available: true },
    ],
  },
];

const router = useRouter();

export default function AdvisorProfileScreen() {
  const [selectedMode, setSelectedMode] = useState<'video' | 'physical'>('video');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const renderCertification = ({ item }: { item: Certification }) => (
    <View className="bg-card rounded-xl border border-border p-4 mr-3" style={{ width: 160 }}>
      <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mb-3">
        <Award size={20} className="text-primary" />
      </View>
      <Text className="text-foreground font-semibold text-sm mb-1" numberOfLines={1}>
        {item.title}
      </Text>
      <Text className="text-muted-foreground text-xs mb-2">{item.issuer}</Text>
      <Text className="text-xs text-muted-foreground">{item.year}</Text>
    </View>
  );

  const renderReview = ({ item }: { item: Review }) => (
    <View className="bg-card rounded-xl border border-border p-4 mb-3">
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 bg-muted rounded-full items-center justify-center">
            <User size={20} className="text-muted-foreground" />
          </View>
          <View>
            <Text className="text-foreground font-semibold text-sm">{item.userName}</Text>
            <Text className="text-muted-foreground text-xs">{item.date}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          <Text className="text-xs font-semibold text-yellow-600">{item.rating}</Text>
        </View>
      </View>
      <Text className="text-foreground text-sm leading-relaxed">{item.comment}</Text>
      <View className="flex-row items-center gap-4 mt-3 pt-3 border-t border-border">
        <TouchableOpacity className="flex-row items-center gap-1">
          <ThumbsUp size={14} className="text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">Helpful</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-1">
          <MessageSquare size={14} className="text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTimeSlot = (slot: TimeSlot) => {
    const isSelected = selectedSlot === slot.id;
    const currentDate = availableDates[selectedDate];

    return (
      <TouchableOpacity
        key={slot.id}
        onPress={() => slot.available && setSelectedSlot(slot.id)}
        disabled={!slot.available}
        className={`px-4 py-3 rounded-lg border-2 mr-2 ${
          isSelected
            ? 'border-primary bg-primary/10'
            : slot.available
            ? 'border-border bg-card'
            : 'border-border bg-muted opacity-50'
        }`}
        style={{ minWidth: 100 }}
      >
        <Text
          className={`text-sm font-semibold ${
            isSelected ? 'text-primary' : slot.available ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          {slot.time}
        </Text>
        {!slot.available && (
          <Text className="text-xs text-muted-foreground mt-1">Booked</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Back Button */}
        <View className="px-6 py-4 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-card rounded-full items-center justify-center border border-border">
            <ArrowLeft size={20} className="text-foreground" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-card rounded-full items-center justify-center border border-border">
            <Shield size={20} className="text-foreground" />
          </TouchableOpacity>
        </View>

        {/* Profile Header */}
        <View className="px-6 mb-6">
          <View className="flex-row items-start gap-4">
            <View className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-border">
              <Image
                source={{ uri: advisorData.avatar }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-foreground mb-1">{advisorData.name}</Text>
              <Text className="text-primary text-sm font-medium mb-2">{advisorData.specialization}</Text>
              <View className="flex-row items-center gap-2 mb-2">
                <View className="flex-row items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <Text className="text-sm font-semibold text-foreground">{advisorData.rating}</Text>
                </View>
                <Text className="text-muted-foreground text-sm">({advisorData.totalReviews} reviews)</Text>
              </View>
              <View className="flex-row items-center gap-2 text-muted-foreground">
                <MapPin size={14} />
                <Text className="text-xs">{advisorData.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View className="px-6 mb-6">
          <View className="flex-row gap-3">
            <View className="flex-1 bg-card rounded-xl border border-border p-4 items-center">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mb-2">
                <Calendar size={20} className="text-primary" />
              </View>
              <Text className="text-lg font-bold text-foreground">{advisorData.experience}</Text>
              <Text className="text-xs text-muted-foreground">Experience</Text>
            </View>
            <View className="flex-1 bg-card rounded-xl border border-border p-4 items-center">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mb-2">
                <User size={20} className="text-primary" />
              </View>
              <Text className="text-lg font-bold text-foreground">{advisorData.totalConsultations}</Text>
              <Text className="text-xs text-muted-foreground">Consultations</Text>
            </View>
            <View className="flex-1 bg-card rounded-xl border border-border p-4 items-center">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mb-2">
                <Star size={20} className="text-primary" />
              </View>
              <Text className="text-lg font-bold text-foreground">{advisorData.rating}</Text>
              <Text className="text-xs text-muted-foreground">Rating</Text>
            </View>
          </View>
        </View>

        {/* Consultation Mode Selector */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-foreground mb-3">Consultation Mode</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setSelectedMode('video')}
              className={`flex-1 rounded-xl border-2 p-4 ${
                selectedMode === 'video' ? 'border-primary bg-primary/5' : 'border-border bg-card'
              }`}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Video size={24} className={selectedMode === 'video' ? 'text-primary' : 'text-muted-foreground'} />
                {selectedMode === 'video' && <CheckCircle size={20} className="text-primary" />}
              </View>
              <Text
                className={`font-semibold mb-1 ${selectedMode === 'video' ? 'text-primary' : 'text-foreground'}`}
              >
                Video Call
              </Text>
              <Text className="text-sm text-muted-foreground">₹{advisorData.consultationFee.video}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedMode('physical')}
              className={`flex-1 rounded-xl border-2 p-4 ${
                selectedMode === 'physical' ? 'border-primary bg-primary/5' : 'border-border bg-card'
              }`}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Phone size={24} className={selectedMode === 'physical' ? 'text-primary' : 'text-muted-foreground'} />
                {selectedMode === 'physical' && <CheckCircle size={20} className="text-primary" />}
              </View>
              <Text
                className={`font-semibold mb-1 ${selectedMode === 'physical' ? 'text-primary' : 'text-foreground'}`}
              >
                In-Person
              </Text>
              <Text className="text-sm text-muted-foreground">₹{advisorData.consultationFee.physical}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-foreground mb-3">About</Text>
          <View className="bg-card rounded-xl border border-border p-4">
            <Text className="text-foreground text-sm leading-relaxed">{advisorData.bio}</Text>
          </View>
        </View>

        {/* Certifications */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text className="text-lg font-semibold text-foreground">Certifications</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-primary text-sm font-medium">View All</Text>
              <ChevronRight size={16} className="text-primary" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={certifications}
            renderItem={renderCertification}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
        </View>

        {/* Reviews */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-foreground">Reviews</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-primary text-sm font-medium">See All</Text>
              <ChevronRight size={16} className="text-primary" />
            </TouchableOpacity>
          </View>
          {reviews.map((item) => (
            <View key={item.id}>{renderReview({ item })}</View>
          ))}
        </View>

        {/* Available Time Slots */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-foreground mb-4">Available Slots</Text>

          {/* Date Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, marginBottom: 16 }}
          >
            {availableDates.map((date, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedDate(index);
                  setSelectedSlot(null);
                }}
                className={`px-5 py-3 rounded-xl border-2 min-w-[80px] items-center ${
                  selectedDate === index ? 'border-primary bg-primary' : 'border-border bg-card'
                }`}
              >
                <Text
                  className={`text-xs font-medium mb-1 ${
                    selectedDate === index ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {date.day}
                </Text>
                <Text
                  className={`text-sm font-bold ${selectedDate === index ? 'text-primary-foreground' : 'text-foreground'}`}
                >
                  {date.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Time Slots */}
          <View className="flex-row flex-wrap">
            {availableDates[selectedDate].slots.map(renderTimeSlot)}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Booking Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-6">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-muted-foreground text-sm">Total Amount</Text>
            <Text className="text-2xl font-bold text-foreground">
              ₹{selectedMode === 'video' ? advisorData.consultationFee.video : advisorData.consultationFee.physical}
            </Text>
          </View>
          <Animated.View style={animatedStyle}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={!selectedSlot}
              className={`px-8 py-4 rounded-xl ${
                selectedSlot ? 'bg-primary' : 'bg-muted opacity-50'
              }`}
            >
              <LinearGradient
                colors={selectedSlot ? ['#2563EB', '#3B82F6'] : ['#94A3B8', '#94A3B8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 12 }}
              >
                <View className="px-6 py-3 rounded-xl items-center justify-center">
                  <Text className="text-white font-semibold text-base">
                    {selectedSlot ? 'Book Consultation' : 'Select Time Slot'}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}