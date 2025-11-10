
import React from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'home',
      label: 'الرئيسية',
    },
    {
      name: 'categories',
      route: '/(tabs)/categories',
      icon: 'view-grid',
      label: 'الأقسام',
    },
    {
      name: 'tasbeeh',
      route: '/(tabs)/tasbeeh',
      icon: 'counter',
      label: 'التسبيح',
    },
    {
      name: 'settings',
      route: '/(tabs)/settings',
      icon: 'cog',
      label: 'الإعدادات',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="categories" />
        <Stack.Screen name="tasbeeh" />
        <Stack.Screen name="settings" />
      </Stack>
      {Platform.OS !== 'ios' && <FloatingTabBar tabs={tabs} />}
    </>
  );
}
