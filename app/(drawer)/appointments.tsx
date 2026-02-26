import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Phone,
  MoreVertical,
  X,
  RefreshCw,
  MessageSquare,
  Star,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react-native';

// Types
type Appointment = {
  id: string;
  advisorName: string;
  specialization: string;
  avatar: string;
  date: string;
  time: string;
  duration: string;
  mode: 'video' | 'physical';
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
};

// Mock Data
const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    advisorName: 'Rajesh Kumar',
    specialization: 'Tax Consultant',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=60',
    date: 'Jan 25, 2025',
    time: '10:30 AM',
    duration: '45 min',
    mode: 'video',
    status: 'scheduled',
  },
  {
    id: '2',
    advisorName: 'Priya Sharma',
    specialization: 'Corporate Lawyer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=60',
    date: 'Jan 28, 2025',
    time: '02:00 PM',
    duration: '60 min',
    mode: 'physical',
    status: 'scheduled',
    location: 'Koramangala, Bengaluru',
  },
];

const pastAppointments: Appointment[] = [
  {
    id: '3',
    advisorName: 'Vikram Singh',
    specialization: 'Financial Advisor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60',
    date: 'Jan 10, 2025',
    time: '11:00 AM',
    duration: '30 min',
    mode: 'video',
    status: 'completed',
  },
  {
    id: '4',
    advisorName: 'Ankit Patel',
    specialization: 'GST Consultant',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60',
    date: 'Jan 05, 2025',
    time: '03:30 PM',
    duration: '45 min',
    mode: 'physical',
    status: 'cancelled',
    location: 'Indiranagar, Bengaluru',
  },
  {
    id: '5',
    advisorName: 'Sneha Reddy',
    specialization: 'Legal Advisor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=60',
    date: 'Dec 28, 2024',
    time: '09:00 AM',
    duration: '60 min',
    mode: 'video',
    status: 'completed',
  },
];

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'scheduled':
        return {
          icon: AlertCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-500/10',
          label: 'Scheduled',
        };
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-500/10',
          label: 'Completed',
        };
      case 'cancelled':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-500/10',
          label: 'Cancelled',
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-500/10',
          label: status,
        };
    }
  };

  const renderAppointmentCard = ({ item }: { item: Appointment }) => {
    const statusConfig = getStatusConfig(item.status);
    const StatusIcon = statusConfig.icon;
    const isUpcoming = activeTab === 'upcoming';

    return (
      <View className="bg-card rounded-xl border border-border mb-4 overflow-hidden">
        {/* Status Bar */}
        <View className={`flex-row items-center justify-between px-4 py-2 ${statusConfig.bgColor}`}>
          <View className="flex-row items-center gap-2">
            <StatusIcon size={16} className={statusConfig.color} />
            <Text className={`text-xs font-semibold ${statusConfig.color}`}>{statusConfig.label}</Text>
          </View>
          <Text className="text-xs text-muted-foreground">{item.date}</Text>
        </View>

        {/* Content */}
        <View className="p-4">
          <View className="flex-row items-start gap-4 mb-4">
            <View className="w-14 h-14 bg-muted rounded-full overflow-hidden">
              {/* Placeholder avatar */}
              <View className="w-full h-full bg-muted items-center justify-center">
                 <Text className="text-muted-foreground text-lg font-bold">
                   {item.advisorName.charAt(0)}
                 </Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-foreground font-semibold text-lg mb-1">{item.advisorName}</Text>
              <Text className="text-muted-foreground text-sm mb-2">{item.specialization}</Text>
              <View className="flex-row items-center gap-4">
                <View className="flex-row items-center gap-1">
                  <Clock size={14} className="text-muted-foreground" />
                  <Text className="text-sm text-muted-foreground">{item.time}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <CalendarIcon size={14} className="text-muted-foreground" />
                  <Text className="text-sm text-muted-foreground">{item.duration}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Mode Info */}
          <View className="bg-muted/50 rounded-lg p-3 mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              {item.mode === 'video' ? (
                <Video size={18} className="text-primary" />
              ) : (
                <Phone size={18} className="text-primary" />
              )}
              <Text className="text-sm font-medium text-foreground capitalize">{item.mode} Consultation</Text>
            </View>
            {item.mode === 'physical' && item.location && (
              <View className="flex-row items-center gap-1 flex-1 justify-end">
                <MapPin size={14} className="text-muted-foreground" />
                <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                  {item.location}
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          {isUpcoming && item.status === 'scheduled' && (
            <View className="flex-row gap-3">
              {item.mode === 'video' ? (
                <TouchableOpacity className="flex-1 bg-primary py-3 rounded-xl items-center">
                  <Text className="text-primary-foreground font-semibold text-sm">Join Call</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className="flex-1 bg-primary py-3 rounded-xl items-center">
                  <Text className="text-primary-foreground font-semibold text-sm">Get Directions</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity className="flex-1 bg-muted py-3 rounded-xl items-center border border-border">
                <View className="flex-row items-center gap-2">
                  <RefreshCw size={16} className="text-foreground" />
                  <Text className="text-foreground font-semibold text-sm">Reschedule</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="w-12 bg-destructive/10 py-3 rounded-xl items-center justify-center border border-destructive/20">
                <X size={20} className="text-destructive" />
              </TouchableOpacity>
            </View>
          )}

          {!isUpcoming && item.status === 'completed' && (
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-primary py-3 rounded-xl items-center">
                <Text className="text-primary-foreground font-semibold text-sm">Book Again</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-muted py-3 rounded-xl items-center border border-border">
                <View className="flex-row items-center gap-2">
                  <Star size={16} className="text-foreground" />
                  <Text className="text-foreground font-semibold text-sm">Rate Advisor</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {!isUpcoming && item.status === 'cancelled' && (
            <TouchableOpacity className="w-full bg-primary py-3 rounded-xl items-center">
              <Text className="text-primary-foreground font-semibold text-sm">Book Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View className="w-20 h-20 bg-muted rounded-full items-center justify-center mb-4">
        <Calendar size={40} className="text-muted-foreground" />
      </View>
      <Text className="text-xl font-semibold text-foreground mb-2">
        No {activeTab === 'upcoming' ? 'Upcoming' : 'Past'} Appointments
      </Text>
      <Text className="text-muted-foreground text-center px-12 mb-6">
        {activeTab === 'upcoming'
          ? "You don't have any scheduled appointments. Book a consultation to get started!"
          : "Your consultation history will appear here."}
      </Text>
      {activeTab === 'upcoming' && (
        <TouchableOpacity className="bg-primary px-6 py-3 rounded-xl">
          <Text className="text-primary-foreground font-semibold">Find an Advisor</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4 border-b border-border">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-foreground">Appointments</Text>
          <ThemeToggle />
        </View>

        {/* Tabs */}
        <View className="flex-row bg-muted p-1 rounded-xl">
          <TouchableOpacity
            onPress={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 rounded-lg items-center ${
              activeTab === 'upcoming' ? 'bg-background shadow-sm' : ''
            }`}
          >
            <Text
              className={`font-medium ${
                activeTab === 'upcoming' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('history')}
            className={`flex-1 py-3 rounded-lg items-center ${
              activeTab === 'history' ? 'bg-background shadow-sm' : ''
            }`}
          >
            <Text
              className={`font-medium ${
                activeTab === 'history' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 128, paddingTop: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'upcoming' ? (
          <>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((item) => (
                <View key={item.id}>{renderAppointmentCard({ item })}</View>
              ))
            ) : (
              renderEmptyState()
            )}
          </>
        ) : (
          <>
            {pastAppointments.length > 0 ? (
              pastAppointments.map((item) => (
                <View key={item.id}>{renderAppointmentCard({ item })}</View>
              ))
            ) : (
              renderEmptyState()
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}