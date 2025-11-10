
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { athkarCategories } from '@/data/athkarData';
import ImprovedAthkarCard from '@/components/ImprovedAthkarCard';
import { useAthkarStore } from '@/stores/athkarStore';
import { getColors } from '@/styles/commonStyles';

export default function AthkarDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isDarkMode = useAthkarStore((state) => state.isDarkMode);
  const colors = getColors(isDarkMode);
  
  const category = athkarCategories.find((cat) => cat.id === id);

  if (!category) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          Category not found
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: category.titleArabic,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: 'NotoNaskhArabic_700Bold',
            fontSize: 20,
          },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color={colors.text}
              />
            </Pressable>
          ),
        }}
      />
      
      <LinearGradient
        colors={isDarkMode ? ['#121212', '#1E1E1E'] : ['#F8F8FF', '#FFFFFF']}
        style={styles.container}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Category Header */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <LinearGradient
              colors={[category.color, `${category.color}DD`]}
              style={styles.headerCard}
            >
              <MaterialCommunityIcons
                name={category.icon as any}
                size={48}
                color="#FFFFFF"
              />
              <Text style={styles.headerTitle}>{category.titleArabic}</Text>
              <Text style={styles.headerSubtitle}>{category.title}</Text>
              <Text style={styles.headerCount}>
                {category.athkar.length} أذكار
              </Text>
            </LinearGradient>
          </Animated.View>

          {/* Athkar List */}
          {category.athkar.map((athkar, index) => (
            <Animated.View
              key={athkar.id}
              entering={FadeInDown.delay(100 + index * 50).duration(400)}
            >
              <ImprovedAthkarCard athkar={athkar} />
            </Animated.View>
          ))}
        </ScrollView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  backButton: {
    marginLeft: 16,
    padding: 8,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  headerCard: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    fontFamily: 'NotoNaskhArabic_700Bold',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 8,
  },
  headerCount: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 8,
    fontFamily: 'NotoNaskhArabic_400Regular',
  },
});
