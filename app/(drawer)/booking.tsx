import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock, Video, MapPin, Check, Info } from 'lucide-react-native';

// Types
type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

type DateItem = {
  id: string;
  day: string;
  date: string;
  fullDate: Date;
  isToday: boolean;
};

// Mock Data for Selected Advisor
const selectedAdvisor = {
  id: '1',
  name: 'Rajesh Kumar',
  specialization: 'Senior Tax Consultant',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
  rating: 4.8,
  physicalFee: 2500,
  videoFee: 1500,
  location: '123, MG Road, Bengaluru, KA',
};

// Generate next 7 days for calendar
const generateDates = (): DateItem[] => {
  const dates: DateItem[] = [];
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      id: `date-${i}`,
      day: days[date.getDay()],
      date: date.getDate().toString(),
      fullDate: date,
      isToday: i === 0,
    });
  }
  return dates;
};

const timeSlots: TimeSlot[] = [
  { id: '1', time: '09:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: false },
  { id: '3', time: '11:00 AM', available: true },
  { id: '4', time: '12:00 PM', available: true },
  { id: '5', time: '02:00 PM', available: true },
  { id: '6', time: '03:00 PM', available: false },
  { id: '7', time: '04:00 PM', available: true },
  { id: '8', time: '05:00 PM', available: true },
];

export default function BookingScreen() {
  const [selectedDate, setSelectedDate] = useState<DateItem | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [consultationMode, setConsultationMode] = useState<'physical' | 'video'>('physical');
  
  const dates = generateDates();
  const currentFee = consultationMode === 'physical' ? selectedAdvisor.physicalFee : selectedAdvisor.videoFee;
  const platformFee = 50;
  const totalFee = currentFee + platformFee;

  const isFormValid = selectedDate && selectedTime;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4 border-b border-border flex-row items-center gap-4">
        <TouchableOpacity className="w-10 h-10 bg-card rounded-full items-center justify-center border border-border">
          <ArrowLeft size={20} className="text-foreground" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-xl font-bold text-foreground">Book Appointment</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 200, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Advisor Summary */}
        <View className="bg-card rounded-xl p-4 border border-border">
          <View className="flex-row items-center gap-4">
            <View className="w-16 h-16 rounded-xl overflow-hidden border-2 border-border">
              <Image
                source={{ uri: selectedAdvisor.avatar }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-foreground">{selectedAdvisor.name}</Text>
              <Text className="text-primary text-sm font-medium">{selectedAdvisor.specialization}</Text>
              <View className="flex-row items-center gap-1 mt-1">
                <Text className="text-sm font-semibold text-foreground">⭐ {selectedAdvisor.rating}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Consultation Mode Toggle */}
        <View>
          <Text className="text-lg font-bold text-foreground mb-4">Consultation Mode</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setConsultationMode('physical')}
              className={`flex-1 p-4 rounded-xl border-2 flex-row items-center gap-3 ${
                consultationMode === 'physical' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-card'
              }`}
            >
              <View className={`w-10 h-10 rounded-full items-center justify-center ${
                consultationMode === 'physical' ? 'bg-primary' : 'bg-muted'
              }`}>
                <MapPin size={20} className={consultationMode === 'physical' ? 'text-primary-foreground' : 'text-muted-foreground'} />
              </View>
              <View className="flex-1">
                <Text className={`font-semibold ${
                  consultationMode === 'physical' ? 'text-primary' : 'text-foreground'
                }`}>In-Person</Text>
                <Text className="text-xs text-muted-foreground">Visit the office</Text>
              </View>
              {consultationMode === 'physical' && (
                <Check size={20} className="text-primary" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setConsultationMode('video')}
              className={`flex-1 p-4 rounded-xl border-2 flex-row items-center gap-3 ${
                consultationMode === 'video' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-card'
              }`}
            >
              <View className={`w-10 h-10 rounded-full items-center justify-center ${
                consultationMode === 'video' ? 'bg-primary' : 'bg-muted'
              }`}>
                <Video size={20} className={consultationMode === 'video' ? 'text-primary-foreground' : 'text-muted-foreground'} />
              </View>
              <View className="flex-1">
                <Text className={`font-semibold ${
                  consultationMode === 'video' ? 'text-primary' : 'text-foreground'
                }`}>Video Call</Text>
                <Text className="text-xs text-muted-foreground">Online meeting</Text>
              </View>
              {consultationMode === 'video' && (
                <Check size={20} className="text-primary" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Picker */}
        <View>
          <View className="flex-row items-center gap-2 mb-4">
            <Calendar size={20} className="text-primary" />
            <Text className="text-lg font-bold text-foreground">Select Date</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {dates.map((date) => {
              const isSelected = selectedDate?.id === date.id;
              return (
                <TouchableOpacity
                  key={date.id}
                  onPress={() => setSelectedDate(date)}
                  className={`w-16 h-20 rounded-xl items-center justify-center border-2 ${
                    isSelected 
                      ? 'border-primary bg-primary' 
                      : 'border-border bg-card'
                  }`}
                >
                  <Text className={`text-xs font-medium ${
                    isSelected ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}>{date.day}</Text>
                  <Text className={`text-xl font-bold mt-1 ${
                    isSelected ? 'text-primary-foreground' : 'text-foreground'
                  }`}>{date.date}</Text>
                  {date.isToday && (
                    <View className={`mt-1 px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-primary-foreground/20' : 'bg-primary/10'
                    }`}>
                      <Text className={`text-[10px] font-semibold ${
                        isSelected ? 'text-primary-foreground' : 'text-primary'
                      }`}>Today</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time Slot Selection */}
        <View>
          <View className="flex-row items-center gap-2 mb-4">
            <Clock size={20} className="text-primary" />
            <Text className="text-lg font-bold text-foreground">Select Time</Text>
          </View>
          <View className="flex-row flex-wrap gap-3">
            {timeSlots.map((slot) => {
              const isSelected = selectedTime?.id === slot.id;
              return (
                <TouchableOpacity
                  key={slot.id}
                  onPress={() => slot.available && setSelectedTime(slot)}
                  disabled={!slot.available}
                  className={`px-4 py-3 rounded-xl border-2 min-w-[100px] ${
                    isSelected 
                      ? 'border-primary bg-primary' 
                      : slot.available 
                        ? 'border-border bg-card' 
                        : 'border-border/50 bg-muted/50 opacity-50'
                  }`}
                >
                  <Text className={`font-semibold text-center ${
                    isSelected ? 'text-primary-foreground' : 'text-foreground'
                  }`}>{slot.time}</Text>
                  {!slot.available && (
                    <Text className="text-xs text-center text-muted-foreground mt-1">Booked</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Fee Summary */}
        <View className="bg-card rounded-xl p-5 border border-border">
          <Text className="text-lg font-bold text-foreground mb-4">Fee Summary</Text>
          
          <View className="space-y-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-muted-foreground">Consultation Fee</Text>
              <Text className="text-foreground font-medium">₹{currentFee}</Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <Text className="text-muted-foreground">Platform Fee</Text>
                <Info size={14} className="text-muted-foreground" />
              </View>
              <Text className="text-foreground font-medium">₹{platformFee}</Text>
            </View>

            <View className="h-px bg-border my-2" />

            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-foreground">Total Amount</Text>
              <Text className="text-xl font-bold text-primary">₹{totalFee}</Text>
            </View>
          </View>

          {consultationMode === 'physical' && (
            <View className="mt-4 pt-4 border-t border-border">
              <View className="flex-row items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5" />
                <View className="flex-1">
                  <Text className="text-sm font-medium text-foreground">Consultation Address</Text>
                  <Text className="text-sm text-muted-foreground mt-1">{selectedAdvisor.location}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-6 pb-8">
        <TouchableOpacity
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl items-center flex-row justify-center ${
            isFormValid 
              ? 'bg-primary' 
              : 'bg-muted opacity-50'
          }`}
        >
          <Text className={`font-semibold text-lg ${
            isFormValid ? 'text-primary-foreground' : 'text-muted-foreground'
          }`}>Confirm Booking</Text>
          <Text className={`ml-2 font-semibold text-lg ${
            isFormValid ? 'text-primary-foreground' : 'text-muted-foreground'
          }`}>- ₹{totalFee}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}