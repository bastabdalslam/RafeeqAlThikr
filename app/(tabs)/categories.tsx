
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { athkarCategories } from '@/data/athkarData';
import ImprovedCategoryCard from '@/components/ImprovedCategoryCard';
import { useAthkarStore } from '@/stores/athkarStore';
import { getColors } from '@/styles/commonStyles';

export default function CategoriesScreen() {
  const isDarkMode = useAthkarStore((state) => state.isDarkMode);
  const colors = getColors(isDarkMode);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'الأقسام',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: 'NotoNaskhArabic_700Bold',
            fontSize: 20,
          },
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
          <Text style={[styles.title, { color: colors.text }]}>
            اختر فئة الأذكار
          </Text>
          
          {athkarCategories.map((category, index) => (
            <Animated.View
              key={category.id}
              entering={FadeInDown.delay(index * 50).duration(400)}
            >
              <ImprovedCategoryCard
                id={category.id}
                title={category.title}
                titleArabic={category.titleArabic}
                icon={category.icon as any}
                color={category.color}
                athkarCount={category.athkar.length}
              />
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'NotoNaskhArabic_700Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
