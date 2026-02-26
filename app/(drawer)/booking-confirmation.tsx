import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle, Calendar, Clock, MapPin, Home, Calendar as CalendarIcon, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

// Mock Appointment Data
const appointmentData = {
  id: 'APT-2024-001',
  advisor: {
    name: 'Rajesh Kumar',
    specialization: 'Senior Tax Consultant',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
  },
  date: 'Tuesday, January 15, 2024',
  time: '11:00 AM - 12:00 PM',
  mode: 'Physical',
  location: {
    address: '123, MG Road, Bengaluru, KA 560001',
    mapImage: 'https://images.unsplash.com/photo-1577086664693-894d8405334a?w=900&auto=format&fit=crop&q=60',
  },
  fees: {
    consultation: 2500,
    platform: 50,
    total: 2550,
  },
};

export default function BookingConfirmationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Animation */}
        <Animated.View 
          entering={ZoomIn.duration(600)}
          className="items-center pt-8 pb-4"
        >
          <View className="w-24 h-24 bg-green-500/10 rounded-full items-center justify-center mb-4">
            <CheckCircle size={64} className="text-green-500" />
          </View>
          <Animated.Text 
            entering={FadeIn.delay(200).duration(600)}
            className="text-3xl font-bold text-foreground text-center"
          >
            Booking Confirmed!
          </Animated.Text>
          <Animated.Text 
            entering={FadeIn.delay(400).duration(600)}
            className="text-muted-foreground text-center mt-2"
          >
            Your appointment has been successfully booked
          </Animated.Text>
        </Animated.View>

        {/* Appointment ID */}
        <View className="bg-primary/5 rounded-xl p-4 border border-primary/20 items-center">
          <Text className="text-sm text-muted-foreground">Appointment ID</Text>
          <Text className="text-lg font-bold text-primary mt-1">{appointmentData.id}</Text>
        </View>

        {/* Advisor Info Card */}
        <Animated.View 
          entering={FadeIn.delay(300).duration(600)}
          className="bg-card rounded-xl p-5 border border-border"
        >
          <Text className="text-sm text-muted-foreground mb-3">Consulting With</Text>
          <View className="flex-row items-center gap-4">
            <View className="w-16 h-16 rounded-xl overflow-hidden border-2 border-border">
              <Image
                source={{ uri: appointmentData.advisor.avatar }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-foreground">{appointmentData.advisor.name}</Text>
              <Text className="text-primary text-sm font-medium">{appointmentData.advisor.specialization}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Date & Time Card */}
        <Animated.View 
          entering={FadeIn.delay(400).duration(600)}
          className="bg-card rounded-xl p-5 border border-border"
        >
          <Text className="text-sm text-muted-foreground mb-3">Schedule</Text>
          
          <View className="space-y-4">
            <View className="flex-row items-start gap-4">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mt-0.5">
                <Calendar size={20} className="text-primary" />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-muted-foreground">Date</Text>
                <Text className="text-base font-semibold text-foreground mt-1">{appointmentData.date}</Text>
              </View>
            </View>

            <View className="flex-row items-start gap-4">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mt-0.5">
                <Clock size={20} className="text-primary" />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-muted-foreground">Time</Text>
                <Text className="text-base font-semibold text-foreground mt-1">{appointmentData.time}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Location Card */}
        <Animated.View 
          entering={FadeIn.delay(500).duration(600)}
          className="bg-card rounded-xl overflow-hidden border border-border"
        >
          <View className="p-5">
            <View className="flex-row items-center gap-2 mb-3">
              <MapPin size={20} className="text-primary" />
              <Text className="text-sm text-muted-foreground">Consultation Location</Text>
            </View>
            <Text className="text-base font-semibold text-foreground mb-3">
              {appointmentData.location.address}
            </Text>
          </View>
          
          {/* Map Preview */}
          <View className="h-40 bg-muted relative">
            <Image
              source={{ uri: appointmentData.location.mapImage }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <TouchableOpacity className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex-row items-center gap-2 shadow-lg">
                <MapPin size={16} className="text-primary" />
                <Text className="text-sm font-semibold text-foreground">View on Map</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Fee Summary */}
        <Animated.View 
          entering={FadeIn.delay(600).duration(600)}
          className="bg-card rounded-xl p-5 border border-border"
        >
          <Text className="text-sm text-muted-foreground mb-3">Payment Summary</Text>
          
          <View className="space-y-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-muted-foreground">Consultation Fee</Text>
              <Text className="text-foreground font-medium">₹{appointmentData.fees.consultation}</Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-muted-foreground">Platform Fee</Text>
              <Text className="text-foreground font-medium">₹{appointmentData.fees.platform}</Text>
            </View>

            <View className="h-px bg-border my-2" />

            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-foreground">Total Paid</Text>
              <Text className="text-xl font-bold text-primary">₹{appointmentData.fees.total}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Important Note */}
        <Animated.View 
          entering={FadeIn.delay(700).duration(600)}
          className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20"
        >
          <Text className="text-sm text-amber-700 dark:text-amber-400 font-medium mb-1">
            ⚠️ Important Note
          </Text>
          <Text className="text-xs text-amber-600 dark:text-amber-500">
            Please arrive 10 minutes before your scheduled appointment. Bring all relevant documents for your consultation.
          </Text>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View 
          entering={FadeIn.delay(800).duration(600)}
          className="space-y-3 pt-4"
        >
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/appointments')}
            className="w-full py-4 bg-primary rounded-xl flex-row items-center justify-center gap-2"
          >
            <CalendarIcon size={20} className="text-primary-foreground" />
            <Text className="font-semibold text-lg text-primary-foreground">View Appointment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/index')}
            className="w-full py-4 bg-card border-2 border-border rounded-xl flex-row items-center justify-center gap-2"
          >
            <Home size={20} className="text-foreground" />
            <Text className="font-semibold text-lg text-foreground">Back to Home</Text>
            <ArrowRight size={20} className="text-muted-foreground" />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}