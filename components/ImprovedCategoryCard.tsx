
import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useAthkarStore } from '@/stores/athkarStore';
import { getColors } from '@/styles/commonStyles';

interface ImprovedCategoryCardProps {
  id: string;
  title: string;
  titleArabic: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  athkarCount: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ImprovedCategoryCard({
  id,
  title,
  titleArabic,
  icon,
  color,
  athkarCount,
}: ImprovedCategoryCardProps) {
  const router = useRouter();
  const isDarkMode = useAthkarStore((state) => state.isDarkMode);
  const colors = getColors(isDarkMode);
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 150,
    });
    opacity.value = withTiming(0.8, {
      duration: 100,
      easing: Easing.ease,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
    opacity.value = withTiming(1, {
      duration: 100,
      easing: Easing.ease,
    });
  };

  const handlePress = () => {
    router.push(`/athkar/${id}` as any);
  };

  // Create gradient colors
  const gradientColors = [color, `${color}DD`];

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle]}
    >
      <LinearGradient
        colors={(gradientColors || ['#000', '#fff']) as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Decorative pattern overlay */}
        <View style={styles.patternOverlay} />
        
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={icon} size={48} color="#FFFFFF" />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.titleArabic}>{titleArabic}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.count}>{athkarCount} أذكار</Text>
          </View>
        </View>
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  gradient: {
    padding: 20,
    minHeight: 120,
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  textContainer: {
    flex: 1,
  },
  titleArabic: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'NotoNaskhArabic_700Bold',
    textAlign: 'right',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.95,
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.85,
    fontFamily: 'NotoNaskhArabic_400Regular',
  },
});
