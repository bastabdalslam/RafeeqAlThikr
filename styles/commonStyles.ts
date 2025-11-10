
import { StyleSheet, ViewStyle, TextStyle, useColorScheme } from 'react-native';

// Islamic-themed color palette - Light Mode
export const lightColors = {
  background: '#F8F8FF',        // Almost White - for a clean, light feel
  backgroundSecondary: '#FFFFFF',
  text: '#242A38',              // Dark Navy - for readability
  textSecondary: '#737B8B',     // Gray - for less important text
  primary: '#BDBDBD',           // Silver - for main interactive elements
  secondary: '#A9A9A9',         // Dark Gray - for secondary interactive elements
  accent: '#D4AF37',            // Gold - for highlights and spiritual emphasis
  card: '#FFFFFF',              // White - for content containers
  highlight: '#E6E6FA',         // Lavender - subtle emphasis
  success: '#34C759',           // Green for success states
  error: '#FF3B30',             // Red for error states
  warning: '#FF9500',           // Orange for warnings
  border: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.08)',
};

// Dark Mode - Improved with #121212 background
export const darkColors = {
  background: '#121212',        // Dark gray instead of pure black
  backgroundSecondary: '#1E1E1E',
  text: '#FFFFFF',              // White text
  textSecondary: '#B0B0B0',     // Light gray for secondary text
  primary: '#8E8E8E',           // Lighter silver for dark mode
  secondary: '#6E6E6E',         // Medium gray
  accent: '#FFD700',            // Brighter gold for dark mode
  card: '#1E1E1E',              // Dark card background
  highlight: '#2A2A3E',         // Dark purple highlight
  success: '#32D74B',           // Brighter green
  error: '#FF453A',             // Brighter red
  warning: '#FF9F0A',           // Brighter orange
  border: '#2C2C2C',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

export const colors = lightColors; // Default export for compatibility

export const getColors = (isDark: boolean) => isDark ? darkColors : lightColors;

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 8px rgba(212, 175, 55, 0.3)',
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100, // Extra space for floating tab bar
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  arabicText: {
    fontSize: 24,
    lineHeight: 40,
    color: colors.text,
    textAlign: 'right',
    fontFamily: 'NotoNaskhArabic_400Regular',
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.primary,
    opacity: 0.3,
    marginVertical: 16,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
