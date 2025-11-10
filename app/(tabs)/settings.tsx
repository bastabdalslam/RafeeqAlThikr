
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Switch, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAthkarStore } from '@/stores/athkarStore';
import { getColors } from '@/styles/commonStyles';
import * as Notifications from 'expo-notifications';

export default function SettingsScreen() {
  const isDarkMode = useAthkarStore((state) => state.isDarkMode);
  const toggleTheme = useAthkarStore((state) => state.toggleTheme);
  const notifications = useAthkarStore((state) => state.notifications);
  const updateNotificationSettings = useAthkarStore((state) => state.updateNotificationSettings);
  const clearAllReminders = useAthkarStore((state) => state.clearAllReminders);
  const colors = getColors(isDarkMode);
  
  const [fontSize, setFontSize] = useState('Medium');
  const [language, setLanguage] = useState('العربية');

  const handleMorningToggle = async (value: boolean) => {
    updateNotificationSettings({ morningEnabled: value });
    
    if (value) {
      // Schedule morning notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'أذكار الصباح',
          body: 'حان وقت أذكار الصباح',
          sound: notifications.soundEnabled,
        },
        trigger: {
  type: 'daily',
  hour: 6,
  minute: 0,
} as Notifications.DailyTriggerInput,
      });
    } else {
      // Cancel morning notifications
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
    
    console.log('Morning notification:', value);
  };

  const handleEveningToggle = async (value: boolean) => {
    updateNotificationSettings({ eveningEnabled: value });
    
    if (value) {
      // Schedule evening notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'أذكار المساء',
          body: 'حان وقت أذكار المساء',
          sound: notifications.soundEnabled,
        },
        trigger: {
  type: 'daily',
  hour: 18,
  minute: 0,
} as Notifications.DailyTriggerInput,
      });
    } else {
      // Cancel evening notifications
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
    
    console.log('Evening notification:', value);
  };

  const handleSoundToggle = (value: boolean) => {
    updateNotificationSettings({ soundEnabled: value });
    console.log('Sound enabled:', value);
  };

  const handleVibrationToggle = (value: boolean) => {
    updateNotificationSettings({ vibrationEnabled: value });
    console.log('Vibration enabled:', value);
  };

  const handleClearReminders = () => {
    Alert.alert(
      'مسح جميع التذكيرات',
      'هل أنت متأكد من مسح جميع التذكيرات المجدولة؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'مسح',
          style: 'destructive',
          onPress: async () => {
            clearAllReminders();
            await Notifications.cancelAllScheduledNotificationsAsync();
            console.log('All reminders cleared');
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
      
      <LinearGradient
        colors={isDarkMode ? ['#000000', '#1A1A1A'] : ['#FFFFFF', '#F5F5F5']}
        style={styles.container}
      >
        <View style={[styles.header, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF' }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Settings
          </Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Notifications Section */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              Notifications
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF' }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons
                  name="weather-sunny"
                  size={24}
                  color="#FFB74D"
                />
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingLabel, { color: colors.text }]}>
                    Morning Reminder
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    Daily at 6:00 AM
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications.morningEnabled}
                onValueChange={handleMorningToggle}
                trackColor={{ false: '#767577', true: '#C9A961' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#767577"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons
                  name="weather-night"
                  size={24}
                  color="#7E57C2"
                />
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingLabel, { color: colors.text }]}>
                    Evening Reminder
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    Daily at 6:00 PM
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications.eveningEnabled}
                onValueChange={handleEveningToggle}
                trackColor={{ false: '#767577', true: '#C9A961' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#767577"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons
                  name="volume-high"
                  size={24}
                  color={colors.accent}
                />
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingLabel, { color: colors.text }]}>
                    Sound
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    Play notification sound
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications.soundEnabled}
                onValueChange={handleSoundToggle}
                trackColor={{ false: '#767577', true: '#C9A961' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#767577"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons
                  name="vibrate"
                  size={24}
                  color={colors.accent}
                />
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingLabel, { color: colors.text }]}>
                    Vibration
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    Vibrate on notification
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications.vibrationEnabled}
                onValueChange={handleVibrationToggle}
                trackColor={{ false: '#767577', true: '#C9A961' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#767577"
              />
            </View>
          </View>

          {/* App Section */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              App
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF' }]}>
            <Pressable style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons
                  name="format-size"
                  size={24}
                  color={colors.accent}
                />
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingLabel, { color: colors.text }]}>
                    Font Size
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    Adjust text size
                  </Text>
                </View>
              </View>
              <View style={styles.settingRight}>
                <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
                  {fontSize}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={colors.textSecondary}
                />
              </View>
            </Pressable>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <Pressable style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons
                  name="translate"
                  size={24}
                  color={colors.accent}
                />
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingLabel, { color: colors.text }]}>
                    Language
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    {language}
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>

          {/* Data Section */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              Data
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF' }]}>
            <Pressable 
              style={styles.settingItem}
              onPress={handleClearReminders}
            >
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={24}
                  color="#EF5350"
                />
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingLabel, { color: '#EF5350' }]}>
                    Clear All Reminders
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    Remove all scheduled notifications
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'NotoNaskhArabic_700Bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: 16,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 17,
    fontWeight: '400',
  },
  settingDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settingValue: {
    fontSize: 17,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 52,
  },
});
