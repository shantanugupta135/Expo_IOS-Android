import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Search, X, Clock, TrendingUp, ChevronRight, Filter, MapPin } from 'lucide-react-native';

// Types
type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
};

type SearchItem = {
  id: string;
  text: string;
  type: 'category' | 'popular' | 'recent';
};

// Mock Data
const categories: Category[] = [
  { id: '1', name: 'ITR Filing', icon: '📄', color: 'bg-blue-500', count: 2450 },
  { id: '2', name: 'Legal Advice', icon: '⚖️', color: 'bg-purple-500', count: 1890 },
  { id: '3', name: 'GST Registration', icon: '📋', color: 'bg-green-500', count: 1560 },
  { id: '4', name: 'Property Law', icon: '🏠', color: 'bg-orange-500', count: 1230 },
  { id: '5', name: 'Tax Planning', icon: '💰', color: 'bg-yellow-500', count: 980 },
  { id: '6', name: 'Corporate Law', icon: '🏢', color: 'bg-indigo-500', count: 870 },
  { id: '7', name: 'Family Law', icon: '👨‍👩‍👧', color: 'bg-pink-500', count: 760 },
  { id: '8', name: 'Contract Review', icon: '📝', color: 'bg-teal-500', count: 650 },
  { id: '9', name: 'Criminal Law', icon: '🔒', color: 'bg-red-500', count: 540 },
  { id: '10', name: 'Intellectual Property', icon: '®️', color: 'bg-cyan-500', count: 430 },
];

const popularSearches: SearchItem[] = [
  { id: '1', text: 'Income Tax Return', type: 'popular' },
  { id: '2', text: 'Divorce Lawyer', type: 'popular' },
  { id: '3', text: 'GST Filing', type: 'popular' },
  { id: '4', text: 'Property Registration', type: 'popular' },
  { id: '5', text: 'Company Incorporation', type: 'popular' },
  { id: '6', text: 'Loan Agreement', type: 'popular' },
];

const recentSearches: SearchItem[] = [
  { id: '1', text: 'CA near me', type: 'recent' },
  { id: '2', text: 'Civil lawyer Bangalore', type: 'recent' },
  { id: '3', text: 'Tax consultant', type: 'recent' },
];

const filterChips = [
  { id: '1', label: 'Video Consult', active: false },
  { id: '2', label: 'Physical Visit', active: false },
  { id: '3', label: 'Top Rated', active: false },
  { id: '4', label: 'Available Now', active: false },
  { id: '5', label: 'Budget Friendly', active: false },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);

  const toggleFilter = (filterId: string) => {
    const newFilters = new Set(selectedFilters);
    if (newFilters.has(filterId)) {
      newFilters.delete(filterId);
    } else {
      newFilters.add(filterId);
    }
    setSelectedFilters(newFilters);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredCategories(categories);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity className="bg-card rounded-xl p-4 border border-border">
      <View className="flex-row items-center justify-between mb-3">
        <View className={`w-12 h-12 ${item.color} rounded-full items-center justify-center`}>
          <Text className="text-xl">{item.icon}</Text>
        </View>
        <ChevronRight size={20} className="text-muted-foreground" />
      </View>
      <Text className="text-foreground font-semibold text-base mb-1">{item.name}</Text>
      <Text className="text-muted-foreground text-sm">{item.count} advisors available</Text>
    </TouchableOpacity>
  );

  const renderSearchItem = ({ item }: { item: SearchItem }) => (
    <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-border">
      <View className="flex-row items-center gap-3">
        {item.type === 'recent' ? (
          <Clock size={18} className="text-muted-foreground" />
        ) : (
          <TrendingUp size={18} className="text-primary" />
        )}
        <Text className="text-foreground text-base">{item.text}</Text>
      </View>
      <ChevronRight size={18} className="text-muted-foreground" />
    </TouchableOpacity>
  );

  const renderFilterChip = (chip: typeof filterChips[0]) => {
    const isActive = selectedFilters.has(chip.id);
    return (
      <TouchableOpacity
        key={chip.id}
        onPress={() => toggleFilter(chip.id)}
        className={`px-4 py-2 rounded-full border ${
          isActive
            ? 'bg-primary border-primary'
            : 'bg-card border-border'
        }`}
      >
        <Text
          className={`text-sm font-medium ${
            isActive ? 'text-primary-foreground' : 'text-foreground'
          }`}
        >
          {chip.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-foreground">Find Advisors</Text>
          <ThemeToggle />
        </View>

        {/* Location Display */}
        <View className="flex-row items-center gap-2 mb-4">
          <MapPin size={16} className="text-primary" />
          <Text className="text-sm text-foreground font-medium">Bengaluru, Karnataka</Text>
          <TouchableOpacity>
            <Text className="text-sm text-primary ml-1">Change</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="relative">
          <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Search size={20} className="text-muted-foreground" />
          </View>
          <TextInput
            className="bg-input text-foreground rounded-xl pl-12 pr-12 py-3 text-base border border-border"
            placeholder="Search advisors, ITR, GST, contracts..."
            placeholderTextColor="rgb(100 116 139)"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              if (text) {
                setFilteredCategories(
                  categories.filter((cat) =>
                    cat.name.toLowerCase().includes(text.toLowerCase())
                  )
                );
              } else {
                setFilteredCategories(categories);
              }
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
              onPress={clearSearch}
            >
              <X size={20} className="text-muted-foreground" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 128 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Chips */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-3">
            <Filter size={16} className="text-muted-foreground" />
            <Text className="text-sm font-semibold text-foreground">Quick Filters</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {filterChips.map(renderFilterChip)}
          </ScrollView>
        </View>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !searchQuery && (
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-semibold text-foreground">Recent Searches</Text>
              <TouchableOpacity>
                <Text className="text-sm text-primary">Clear All</Text>
              </TouchableOpacity>
            </View>
            <View className="bg-card rounded-xl border border-border overflow-hidden">
              {recentSearches.map((item) => (
                <View key={item.id}>
                  {renderSearchItem({ item })}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Popular Searches */}
        {!searchQuery && (
          <View className="mb-6">
            <Text className="text-lg font-semibold text-foreground mb-3">Popular Searches</Text>
            <View className="bg-card rounded-xl border border-border overflow-hidden">
              {popularSearches.map((item) => (
                <View key={item.id}>
                  {renderSearchItem({ item })}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Advisor Categories */}
        <View>
          <Text className="text-lg font-semibold text-foreground mb-3">
            {searchQuery ? 'Search Results' : 'Browse by Category'}
          </Text>
          {filteredCategories.length > 0 ? (
            <FlatList
              data={filteredCategories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 12 }}
            />
          ) : (
            <View className="bg-card rounded-xl border border-border p-8 items-center">
              <Search size={48} className="text-muted-foreground mb-3" />
              <Text className="text-foreground font-semibold mb-1">No results found</Text>
              <Text className="text-muted-foreground text-center text-sm">
                Try searching for different terms or browse our categories
              </Text>
            </View>
          )}
        </View>

        {/* More Categories Link */}
        {!searchQuery && filteredCategories.length === categories.length && (
          <TouchableOpacity className="mt-4 items-center py-3">
            <View className="flex-row items-center gap-2">
              <Text className="text-primary font-semibold">View All Categories</Text>
              <ChevronRight size={18} className="text-primary" />
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}