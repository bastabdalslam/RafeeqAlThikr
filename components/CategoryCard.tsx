
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import { AthkarCategory } from '@/data/athkarData';
import { useRouter } from 'expo-router';

interface CategoryCardProps {
  category: AthkarCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/athkar/${category.id}` as any);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: category.color },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <IconSymbol name={category.icon as any} size={32} color={colors.card} />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{category.title}</Text>
        <Text style={styles.titleArabic}>{category.titleArabic}</Text>
        <Text style={styles.count}>{category.athkar.length} Athkar</Text>
      </View>

      <IconSymbol name="chevron.right" size={20} color={colors.card} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
    marginBottom: 4,
  },
  titleArabic: {
    fontSize: 16,
    color: colors.card,
    opacity: 0.9,
    marginBottom: 4,
  },
  count: {
    fontSize: 12,
    color: colors.card,
    opacity: 0.8,
  },
});
