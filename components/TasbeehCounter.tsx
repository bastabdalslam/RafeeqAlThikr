
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function TasbeehCounter() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(100);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (newCount === goal) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleReset = () => {
    setCount(0);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const progress = Math.min((count / goal) * 100, 100);

  return (
    <View style={styles.container}>
      {/* Progress Circle */}
      <View style={styles.progressContainer}>
        <View style={styles.progressCircle}>
          <Text style={styles.countText}>{count}</Text>
          <Text style={styles.goalText}>of {goal}</Text>
        </View>
        
        {/* Progress indicator */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Counter Button */}
      <Pressable
        onPress={handleIncrement}
        style={({ pressed }) => [
          styles.counterButton,
          pressed && styles.counterButtonPressed,
        ]}
      >
        <Text style={styles.counterButtonText}>Tap to Count</Text>
        <IconSymbol name="hand.tap.fill" size={24} color={colors.card} />
      </Pressable>

      {/* Reset Button */}
      <Pressable onPress={handleReset} style={styles.resetButton}>
        <IconSymbol name="arrow.counterclockwise" size={20} color={colors.textSecondary} />
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>

      {/* Goal Setter */}
      <View style={styles.goalContainer}>
        <Text style={styles.goalLabel}>Daily Goal:</Text>
        <View style={styles.goalButtons}>
          {[33, 100, 500, 1000].map((value) => (
            <Pressable
              key={value}
              onPress={() => setGoal(value)}
              style={[
                styles.goalButton,
                goal === value && styles.goalButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.goalButtonText,
                  goal === value && styles.goalButtonTextActive,
                ]}
              >
                {value}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  progressCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
    elevation: 8,
    borderWidth: 8,
    borderColor: colors.accent,
  },
  countText: {
    fontSize: 64,
    fontWeight: '700',
    color: colors.text,
  },
  goalText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
    marginTop: 24,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  counterButton: {
    backgroundColor: colors.accent,
    paddingVertical: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    boxShadow: '0px 4px 12px rgba(212, 175, 55, 0.4)',
    elevation: 6,
    marginBottom: 16,
  },
  counterButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.card,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  resetText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  goalContainer: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
    opacity: 0.3,
  },
  goalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  goalButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  goalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.card,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  goalButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  goalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  goalButtonTextActive: {
    color: colors.card,
  },
});
