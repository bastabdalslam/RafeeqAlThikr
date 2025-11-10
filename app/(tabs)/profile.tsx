
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function ProfileScreen() {
  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Profile',
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={commonStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <IconSymbol name="person.fill" size={48} color={colors.card} />
            </View>
            <Text style={styles.userName}>Muslim User</Text>
            <Text style={styles.userSubtitle}>May Allah bless you</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <IconSymbol name="checkmark.circle.fill" size={32} color={colors.success} />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statCard}>
              <IconSymbol name="flame.fill" size={32} color={colors.warning} />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>

          {/* Coming Soon */}
          <View style={commonStyles.card}>
            <Text style={styles.comingSoonTitle}>Profile Features Coming Soon</Text>
            <Text style={styles.comingSoonText}>
              - Track your daily athkar progress{'\n'}
              - View your reading history{'\n'}
              - Set personal goals{'\n'}
              - Earn achievements{'\n'}
              - Sync across devices
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(212, 175, 55, 0.3)',
    elevation: 6,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 28,
  },
});
