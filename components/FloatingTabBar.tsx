
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAthkarStore } from '@/stores/athkarStore';
import { getColors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = 360,
  borderRadius = 30,
  bottomMargin = 20,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isDarkMode = useAthkarStore((state) => state.isDarkMode);
  const colors = getColors(isDarkMode);
  
  const indicatorPosition = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const getActiveIndex = () => {
    const index = tabs.findIndex((tab) => {
      if (tab.route === '/(tabs)/(home)/') {
        return pathname === '/' || pathname.startsWith('/(tabs)/(home)');
      }
      return pathname.includes(tab.name);
    });
    return index >= 0 ? index : 0;
  };

  const activeIndex = getActiveIndex();

  const indicatorStyle = useAnimatedStyle(() => {
    const tabWidth = containerWidth / tabs.length;
    const position = activeIndex * tabWidth;
    
    indicatorPosition.value = withSpring(position, {
      damping: 20,
      stiffness: 150,
    });
    
    indicatorWidth.value = withSpring(tabWidth * 0.6, {
      damping: 20,
      stiffness: 150,
    });

    return {
      transform: [{ translateX: indicatorPosition.value + tabWidth * 0.2 }],
      width: indicatorWidth.value,
    };
  });

  const handleTabPress = (route: string, index: number) => {
    router.push(route as any);
  };

  return (
    <View
      style={[
        styles.container,
        {
          bottom: bottomMargin + insets.bottom,
          width: containerWidth,
        },
      ]}
    >
      <BlurView
        intensity={Platform.OS === 'ios' ? 80 : 100}
        tint={isDarkMode ? 'dark' : 'light'}
        style={[styles.blurContainer, { borderRadius }]}
      >
        {/* Glass morphism overlay */}
        <View
          style={[
            styles.glassOverlay,
            {
              borderRadius,
              backgroundColor: isDarkMode
                ? 'rgba(30, 30, 30, 0.7)'
                : 'rgba(255, 255, 255, 0.7)',
            },
          ]}
        />

        {/* Active indicator */}
        <Animated.View
          style={[
            styles.activeIndicator,
            indicatorStyle,
            { backgroundColor: colors.accent },
          ]}
        />

        {/* Tab buttons */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            
            return (
              <TouchableOpacity
                key={tab.name}
                onPress={() => handleTabPress(tab.route, index)}
                style={styles.tab}
                activeOpacity={0.7}
              >
                <Animated.View style={styles.tabContent}>
                  <MaterialCommunityIcons
                    name={tab.icon}
                    size={24}
                    color={isActive ? colors.accent : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      {
                        color: isActive ? colors.accent : colors.textSecondary,
                        fontWeight: isActive ? '700' : '500',
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  blurContainer: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    // backdropFilter: 'blur(20px)', // Removed: Web-only property, use BlurView instead
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 8,
    height: 4,
    borderRadius: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
  },
});
