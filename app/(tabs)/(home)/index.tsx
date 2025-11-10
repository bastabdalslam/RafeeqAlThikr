
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { dailyDuas, hadithOfTheDay, athkarCategories } from '@/data/athkarData';
import ImprovedCategoryCard from '@/components/ImprovedCategoryCard';
import { useAthkarStore } from '@/stores/athkarStore';
import { getColors } from '@/styles/commonStyles';

export default function HomeScreen() {
  const isDarkMode = useAthkarStore((state) => state.isDarkMode);
  const toggleTheme = useAthkarStore((state) => state.toggleTheme);
  const loadFromStorage = useAthkarStore((state) => state.loadFromStorage);
  const getTodayProgress = useAthkarStore((state) => state.getTodayProgress);
  const colors = getColors(isDarkMode);
  
  const [greeting, setGreeting] = useState('');
  const [randomDua, setRandomDua] = useState(dailyDuas[0]);
  const [randomHadith, setRandomHadith] = useState(hadithOfTheDay[0]);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');

  useEffect(() => {
    loadFromStorage();
    updateGreeting();
    
    const randomDuaIndex = Math.floor(Math.random() * dailyDuas.length);
    const randomHadithIndex = Math.floor(Math.random() * hadithOfTheDay.length);
    
    setRandomDua(dailyDuas[randomDuaIndex]);
    setRandomHadith(hadithOfTheDay[randomHadithIndex]);
  }, []);

  const updateGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting('صباح الخير');
      setTimeOfDay('morning');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('مساء الخير');
      setTimeOfDay('afternoon');
    } else if (hour >= 17 && hour < 21) {
      setGreeting('مساء الخير');
      setTimeOfDay('evening');
    } else {
      setGreeting('تصبح على خير');
      setTimeOfDay('night');
    }
  };

  const getBackgroundGradient = () => {
    if (isDarkMode) {
      switch (timeOfDay) {
        case 'morning':
          return ['#1a1a2e', '#16213e'];
        case 'afternoon':
          return ['#16213e', '#0f3460'];
        case 'evening':
          return ['#0f3460', '#1a1a2e'];
        case 'night':
          return ['#0a0a0a', '#1a1a2e'];
        default:
          return ['#121212', '#1E1E1E'];
      }
    } else {
      switch (timeOfDay) {
        case 'morning':
          return ['#FFE5B4', '#FFF8DC'];
        case 'afternoon':
          return ['#87CEEB', '#B0E0E6'];
        case 'evening':
          return ['#FFB6C1', '#FFC0CB'];
        case 'night':
          return ['#191970', '#4B0082'];
        default:
          return ['#F8F8FF', '#FFFFFF'];
      }
    }
  };

  const todayProgress = getTodayProgress();

  const renderHeaderRight = () => (
    <Pressable onPress={toggleTheme} style={styles.themeButton}>
      <MaterialCommunityIcons
        name={isDarkMode ? 'white-balance-sunny' : 'moon-waning-crescent'}
        size={24}
        color={colors.text}
      />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'أذكار',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: 'NotoNaskhArabic_700Bold',
            fontSize: 20,
          },
          headerRight: renderHeaderRight,
        }}
      />
      
      <LinearGradient
        colors={(getBackgroundGradient() || ['#121212', '#1E1E1E']) as [string, string]}
        style={styles.container}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Greeting Card */}
          <Animated.View entering={FadeIn.duration(600)}>
            <LinearGradient
              colors={isDarkMode ? ['#2A2A2A', '#1E1E1E'] : ['#FFFFFF', '#F8F8FF']}
              style={styles.greetingCard}
            >
              <View style={styles.greetingContent}>
                <MaterialCommunityIcons
                  name={
                    timeOfDay === 'morning' ? 'weather-sunny' :
                    timeOfDay === 'afternoon' ? 'weather-partly-cloudy' :
                    timeOfDay === 'evening' ? 'weather-sunset' :
                    'weather-night'
                  }
                  size={40}
                  color={colors.accent}
                />
                <Text style={[styles.greetingText, { color: colors.text }]}>
                  {greeting}
                </Text>
                <Text style={[styles.greetingSubtext, { color: colors.textSecondary }]}>
                  {new Date().toLocaleDateString('ar-SA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Daily Progress */}
          <Animated.View entering={FadeInDown.delay(100).duration(600)}>
            <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
              <View style={styles.progressHeader}>
                <MaterialCommunityIcons name="chart-arc" size={24} color={colors.accent} />
                <Text style={[styles.progressTitle, { color: colors.text }]}>
                  تقدمك اليوم
                </Text>
              </View>
              
              <View style={styles.progressBar}>
                <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${todayProgress}%`,
                        backgroundColor: colors.accent,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.progressText, { color: colors.text }]}>
                  {todayProgress}%
                </Text>
              </View>
              
              <Text style={[styles.progressMessage, { color: colors.textSecondary }]}>
                {todayProgress >= 80
                  ? 'ما شاء الله! أنت تقوم بعمل رائع 🌟'
                  : todayProgress >= 50
                  ? 'استمر في التقدم! 💪'
                  : 'ابدأ يومك بالأذكار 🤲'}
              </Text>
            </View>
          </Animated.View>

          {/* Daily Dua */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <LinearGradient
              colors={isDarkMode ? ['#2A2A2A', '#1E1E1E'] : ['#FFFFFF', '#F8F8FF']}
              style={styles.duaCard}
            >
              <View style={styles.duaHeader}>
                <MaterialCommunityIcons name="book-open-variant" size={24} color={colors.accent} />
                <Text style={[styles.duaTitle, { color: colors.text }]}>
                  دعاء اليوم
                </Text>
              </View>
              
              <Text style={[styles.duaArabic, { color: colors.text }]}>
                {randomDua.arabic}
              </Text>
              
              <Text style={[styles.duaTranslation, { color: colors.textSecondary }]}>
                {randomDua.translation}
              </Text>
              
              <Text style={[styles.duaReference, { color: colors.accent }]}>
                {randomDua.reference}
              </Text>
            </LinearGradient>
          </Animated.View>

          {/* Hadith of the Day */}
          <Animated.View entering={FadeInDown.delay(300).duration(600)}>
            <LinearGradient
              colors={isDarkMode ? ['#2A2A2A', '#1E1E1E'] : ['#FFFFFF', '#F8F8FF']}
              style={styles.hadithCard}
            >
              <View style={styles.hadithHeader}>
                <MaterialCommunityIcons name="format-quote-close" size={24} color={colors.accent} />
                <Text style={[styles.hadithTitle, { color: colors.text }]}>
                  حديث اليوم
                </Text>
              </View>
              
              <Text style={[styles.hadithArabic, { color: colors.text }]}>
                {randomHadith.arabic}
              </Text>
              
              <Text style={[styles.hadithTranslation, { color: colors.textSecondary }]}>
                {randomHadith.translation}
              </Text>
              
              <Text style={[styles.hadithReference, { color: colors.accent }]}>
                {randomHadith.reference}
              </Text>
            </LinearGradient>
          </Animated.View>

          {/* Categories Section */}
          <Animated.View entering={FadeInDown.delay(400).duration(600)}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              الأذكار
            </Text>
            
            {athkarCategories.map((category, index) => (
              <Animated.View
                key={category.id}
                entering={FadeInDown.delay(500 + index * 50).duration(600)}
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
          </Animated.View>
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
  themeButton: {
    marginRight: 16,
    padding: 8,
  },
  greetingCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
      },
    }),
  },
  greetingContent: {
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'NotoNaskhArabic_700Bold',
    marginTop: 12,
  },
  greetingSubtext: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: 'NotoNaskhArabic_400Regular',
  },
  progressCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
      },
    }),
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'NotoNaskhArabic_700Bold',
  },
  progressBar: {
    marginBottom: 12,
  },
  progressBarBg: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  progressMessage: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'NotoNaskhArabic_400Regular',
  },
  duaCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
      },
    }),
  },
  duaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  duaTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'NotoNaskhArabic_700Bold',
  },
  duaArabic: {
    fontSize: 20,
    lineHeight: 36,
    textAlign: 'right',
    fontFamily: 'NotoNaskhArabic_400Regular',
    marginBottom: 12,
  },
  duaTranslation: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 8,
  },
  duaReference: {
    fontSize: 12,
    fontWeight: '600',
  },
  hadithCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
      },
    }),
  },
  hadithHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  hadithTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'NotoNaskhArabic_700Bold',
  },
  hadithArabic: {
    fontSize: 20,
    lineHeight: 36,
    textAlign: 'right',
    fontFamily: 'NotoNaskhArabic_400Regular',
    marginBottom: 12,
  },
  hadithTranslation: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 8,
  },
  hadithReference: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'NotoNaskhArabic_700Bold',
    marginBottom: 16,
  },
});
