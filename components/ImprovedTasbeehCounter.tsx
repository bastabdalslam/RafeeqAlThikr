
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAthkarStore } from '@/stores/athkarStore';
import { getColors } from '@/styles/commonStyles';

export default function ImprovedTasbeehCounter() {
  const isDarkMode = useAthkarStore((state) => state.isDarkMode);
  const tasbeehCount = useAthkarStore((state) => state.tasbeehCount);
  const tasbeehTarget = useAthkarStore((state) => state.tasbeehTarget);
  const tasbeehSets = useAthkarStore((state) => state.tasbeehSets);
  const incrementTasbeeh = useAthkarStore((state) => state.incrementTasbeeh);
  const resetTasbeeh = useAthkarStore((state) => state.resetTasbeeh);
  const setTasbeehTarget = useAthkarStore((state) => state.setTasbeehTarget);
  const colors = getColors(isDarkMode);

  const [isCompleted, setIsCompleted] = useState(false);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    const currentCount = tasbeehCount % tasbeehTarget;
    if (currentCount === 0 && tasbeehCount > 0) {
      setIsCompleted(true);
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0, { duration: 500 })
        ),
        3,
        false
      );
      
      setTimeout(() => setIsCompleted(false), 3000);
    }
  }, [tasbeehCount]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handleIncrement = () => {
    incrementTasbeeh();
    
    // Haptic feedback
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Animation
    scale.value = withSequence(
      withSpring(0.95, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );
    
    rotation.value = withSequence(
      withTiming(5, { duration: 100 }),
      withTiming(-5, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );
    
    // Check if target reached
    if ((tasbeehCount + 1) % tasbeehTarget === 0) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
  };

  const handleReset = () => {
    resetTasbeeh();
    
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
    
    console.log('Tasbeeh reset');
  };

  const handleTargetChange = (newTarget: number) => {
    setTasbeehTarget(newTarget);
    console.log('Target changed to:', newTarget);
  };

  const currentCount = tasbeehCount % tasbeehTarget;
  const progress = currentCount / tasbeehTarget;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Digital Tasbeeh
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Tap the circle to count your dhikr
        </Text>
      </View>

      <View style={styles.content}>
        {/* Main Counter Circle */}
        <Pressable onPress={handleIncrement} style={styles.counterContainer}>
          <Animated.View style={[styles.counterCircle, animatedStyle]}>
            {/* Glow Effect */}
            <Animated.View 
              style={[
                styles.glowCircle,
                glowStyle,
                { backgroundColor: colors.accent }
              ]}
            />
            
            {/* Progress Ring */}
            <View style={styles.progressRing}>
              <View 
                style={[
                  styles.progressFill,
                  {
                    borderColor: colors.accent,
                    borderWidth: 8,
                    transform: [{ rotate: `${progress * 360}deg` }],
                  }
                ]}
              />
            </View>
            
            {/* Inner Circle */}
            <LinearGradient
              colors={isDarkMode ? ['#1E1E1E', '#2A2A2A'] : ['#FFFFFF', '#F8F8FF']}
              style={styles.innerCircle}
            >
              <Text style={[styles.countText, { color: colors.accent }]}>
                {currentCount}
              </Text>
              <Text style={[styles.targetText, { color: colors.textSecondary }]}>
                of {tasbeehTarget}
              </Text>
            </LinearGradient>
          </Animated.View>
        </Pressable>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {tasbeehCount}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Total Count
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {tasbeehSets}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Sets of {tasbeehTarget}
            </Text>
          </View>
        </View>

        {/* Target Selection */}
        <View style={styles.targetContainer}>
          <Text style={[styles.targetLabel, { color: colors.textSecondary }]}>
            Target:
          </Text>
          <View style={styles.targetButtons}>
            {[33, 100, 1000].map((target) => (
              <Pressable
                key={target}
                style={[
                  styles.targetButton,
                  {
                    backgroundColor: tasbeehTarget === target ? colors.accent : colors.card,
                  }
                ]}
                onPress={() => handleTargetChange(target)}
              >
                <Text
                  style={[
                    styles.targetButtonText,
                    {
                      color: tasbeehTarget === target ? '#FFFFFF' : colors.text,
                    }
                  ]}
                >
                  {target}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Reset Button */}
        <Pressable
          style={[styles.resetButton, { backgroundColor: colors.accent }]}
          onPress={handleReset}
        >
          <MaterialCommunityIcons name="refresh" size={24} color="#FFFFFF" />
          <Text style={styles.resetButtonText}>Reset</Text>
        </Pressable>

        {/* Dhikr Text */}
        <View style={styles.dhikrContainer}>
          <Text style={[styles.dhikrText, { color: colors.text }]}>
            سُبْحَانَ اللَّهِ
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'NotoNaskhArabic_700Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  counterContainer: {
    marginBottom: 40,
  },
  counterCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.3,
  },
  progressRing: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 8,
    borderColor: 'rgba(201, 169, 97, 0.2)',
  },
  progressFill: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 8,
    borderColor: '#C9A961',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  innerCircle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  countText: {
    fontSize: 72,
    fontWeight: '700',
    fontFamily: 'NotoNaskhArabic_700Bold',
  },
  targetText: {
    fontSize: 16,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    width: '100%',
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
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
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'NotoNaskhArabic_700Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    textAlign: 'center',
  },
  targetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  targetLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  targetButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  targetButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  targetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#C9A961',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0px 4px 12px rgba(201, 169, 97, 0.3)',
      },
    }),
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  dhikrContainer: {
    paddingHorizontal: 20,
  },
  dhikrText: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'NotoNaskhArabic_700Bold',
    textAlign: 'center',
  },
});
