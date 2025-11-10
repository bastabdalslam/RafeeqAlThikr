
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Share, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Athkar } from '@/data/athkarData';
import { useAthkarStore } from '@/stores/athkarStore';
import { getColors } from '@/styles/commonStyles';

interface ImprovedAthkarCardProps {
  athkar: Athkar;
  onComplete?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ImprovedAthkarCard({ athkar, onComplete }: ImprovedAthkarCardProps) {
  const isDarkMode = useAthkarStore((state) => state.isDarkMode);
  const colors = getColors(isDarkMode);
  const progress = useAthkarStore((state) => state.progress[athkar.id]);
  const updateProgress = useAthkarStore((state) => state.updateProgress);
  const toggleFavorite = useAthkarStore((state) => state.toggleFavorite);
  const favorites = useAthkarStore((state) => state.favorites);
  
  const [currentCount, setCurrentCount] = useState(progress?.completed || 0);
  const isFavorite = favorites.includes(athkar.id);
  
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const maxCount = athkar.count || 1;
  const progressPercentage = (currentCount / maxCount) * 100;

  const handlePress = () => {
    if (currentCount < maxCount) {
      const newCount = currentCount + 1;
      setCurrentCount(newCount);
      updateProgress(athkar.id, newCount);
      
      // Haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      // Animation
      scale.value = withSequence(
        withSpring(1.05, { damping: 10 }),
        withSpring(1, { damping: 10 })
      );
      
      if (newCount === maxCount) {
        // Completion animation
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onComplete?.();
      }
    } else {
      // Reset
      setCurrentCount(0);
      updateProgress(athkar.id, 0);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${athkar.arabic}\n\n${athkar.translation}\n\n${athkar.transliteration || ''}`,
        title: 'Share Athkar',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleFavorite = () => {
    toggleFavorite(athkar.id);
    heartScale.value = withSequence(
      withSpring(1.3, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <AnimatedPressable onPress={handlePress} style={[styles.container, animatedStyle]}>
      <LinearGradient
        colors={isDarkMode ? ['#1E1E1E', '#2A2A2A'] : ['#FFFFFF', '#F8F8FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        {/* Decorative pattern */}
        <View style={styles.decorativePattern} />
        
        {/* Header with count and actions */}
        <View style={styles.header}>
          <View style={styles.countBadge}>
            <Text style={[styles.countText, { color: colors.accent }]}>
              {currentCount}/{maxCount}
            </Text>
          </View>
          
          <View style={styles.actions}>
            <Pressable onPress={handleFavorite} style={styles.actionButton}>
              <Animated.View style={heartAnimatedStyle}>
                <MaterialCommunityIcons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite ? '#FF3B30' : colors.textSecondary}
                />
              </Animated.View>
            </Pressable>
            
            <Pressable onPress={handleShare} style={styles.actionButton}>
              <MaterialCommunityIcons
                name="share-variant"
                size={24}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>
        </View>

        {/* Arabic Text */}
        <Text style={[styles.arabicText, { color: colors.text }]}>
          {athkar.arabic}
        </Text>

        {/* Translation */}
        <Text style={[styles.translationText, { color: colors.textSecondary }]}>
          {athkar.translation}
        </Text>

        {/* Transliteration */}
        {athkar.transliteration && (
          <Text style={[styles.transliterationText, { color: colors.textSecondary }]}>
            {athkar.transliteration}
          </Text>
        )}

        {/* Reference */}
        {athkar.reference && (
          <Text style={[styles.referenceText, { color: colors.accent }]}>
            {athkar.reference}
          </Text>
        )}

        {/* Progress Bar */}
        {maxCount > 1 && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: `${progressPercentage}%`,
                    backgroundColor: colors.accent,
                  },
                ]}
              />
            </View>
          </View>
        )}

        {/* Completion indicator */}
        {currentCount === maxCount && (
          <View style={styles.completionBadge}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#34C759" />
            <Text style={styles.completionText}>مكتمل</Text>
          </View>
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
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
  gradient: {
    padding: 20,
  },
  decorativePattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    transform: [{ translateX: 30 }, { translateY: -30 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  countBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countText: {
    fontSize: 14,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  arabicText: {
    fontSize: 22,
    lineHeight: 38,
    textAlign: 'right',
    fontFamily: 'NotoNaskhArabic_400Regular',
    marginBottom: 12,
  },
  translationText: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 8,
  },
  transliterationText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  referenceText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 6,
  },
  completionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34C759',
    fontFamily: 'NotoNaskhArabic_600SemiBold',
  },
});
