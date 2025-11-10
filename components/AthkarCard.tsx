
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Athkar } from '@/data/athkarData';

interface AthkarCardProps {
  athkar: Athkar;
  onComplete?: () => void;
}

export default function AthkarCard({ athkar, onComplete }: AthkarCardProps) {
  const [count, setCount] = useState(athkar.count || 1);
  const [completed, setCompleted] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePress = () => {
    if (count > 1) {
      setCount(count - 1);
      
      // Animate scale
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        onPress={handlePress}
        style={[styles.card, completed && styles.completedCard]}
      >
        {/* Arabic Text */}
        <Text style={commonStyles.arabicText}>{athkar.arabic}</Text>

        {/* Translation */}
        <Text style={commonStyles.translationText}>{athkar.translation}</Text>

        {/* Transliteration */}
        {athkar.transliteration && (
          <Text style={styles.transliteration}>{athkar.transliteration}</Text>
        )}

        {/* Reference */}
        {athkar.reference && (
          <Text style={styles.reference}>— {athkar.reference}</Text>
        )}

        {/* Counter */}
        {athkar.count && athkar.count > 1 && (
          <View style={styles.counterContainer}>
            <View style={[styles.counterBadge, completed && styles.completedBadge]}>
              {completed ? (
                <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
              ) : (
                <Text style={styles.counterText}>{count}</Text>
              )}
            </View>
            <Text style={styles.counterLabel}>
              {completed ? 'Completed' : 'Tap to count'}
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  completedCard: {
    backgroundColor: colors.highlight,
    borderLeftColor: colors.success,
  },
  transliteration: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.textSecondary,
    marginTop: 8,
  },
  reference: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 12,
    fontWeight: '600',
  },
  counterContainer: {
    marginTop: 16,
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
    opacity: 0.3,
  },
  counterBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    boxShadow: '0px 4px 8px rgba(212, 175, 55, 0.3)',
    elevation: 4,
  },
  completedBadge: {
    backgroundColor: colors.success,
  },
  counterText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.card,
  },
  counterLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
