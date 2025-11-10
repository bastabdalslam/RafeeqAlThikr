
import { create } from 'zustand';
import { sqliteStorage, getBooleanFromStorage } from '../utils/sqliteStorage';

// Use the new SQLite storage wrapper
const storage = sqliteStorage;

interface AthkarProgress {
  [key: string]: {
    completed: number;
    lastCompleted?: string;
  };
}

interface DailyStats {
  date: string;
  completedAthkar: string[];
  tasbeehCount: number;
  totalProgress: number;
}

interface NotificationSettings {
  morningEnabled: boolean;
  eveningEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

interface AthkarStore {
  // Progress tracking
  progress: AthkarProgress;
  dailyStats: DailyStats;
  
  // Theme
  isDarkMode: boolean;
  
  // Favorites
  favorites: string[];
  
  // Tasbeeh
  tasbeehCount: number;
  tasbeehTarget: number;
  tasbeehSets: number;
  
  // Notifications
  notifications: NotificationSettings;
  
  // Actions
  updateProgress: (athkarId: string, count: number) => void;
  resetProgress: (athkarId: string) => void;
  toggleFavorite: (athkarId: string) => void;
  toggleTheme: () => void;
  updateDailyStats: (stats: Partial<DailyStats>) => void;
  getTodayProgress: () => number;
  
  // Tasbeeh actions
  incrementTasbeeh: () => void;
  resetTasbeeh: () => void;
  setTasbeehTarget: (target: number) => void;
  
  // Notification actions
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  clearAllReminders: () => void;
  
  // Persistence
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

export const useAthkarStore = create<AthkarStore>((set, get) => ({
  progress: {},
  dailyStats: {
    date: new Date().toDateString(),
    completedAthkar: [],
    tasbeehCount: 0,
    totalProgress: 0,
  },
  isDarkMode: false,
  favorites: [],
  tasbeehCount: 0,
  tasbeehTarget: 100,
  tasbeehSets: 0,
  notifications: {
    morningEnabled: true,
    eveningEnabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
  },

  updateProgress: (athkarId: string, count: number) => {
    const state = get();
    const newProgress = {
      ...state.progress,
      [athkarId]: {
        completed: count,
        lastCompleted: new Date().toISOString(),
      },
    };
    
    set({ progress: newProgress });
    
    // Save to MMKV
    try {
      await storage.set('athkar_progress', JSON.stringify(newProgress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
    
    console.log('Progress updated for:', athkarId, 'Count:', count);
  },

  resetProgress: (athkarId: string) => {
    const state = get();
    const newProgress = { ...state.progress };
    delete newProgress[athkarId];
    
    set({ progress: newProgress });
    try {
      await storage.set('athkar_progress', JSON.stringify(newProgress));
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
    
    console.log('Progress reset for:', athkarId);
  },

  toggleFavorite: (athkarId: string) => {
    const state = get();
    const isFavorite = state.favorites.includes(athkarId);
    const newFavorites = isFavorite
      ? state.favorites.filter(id => id !== athkarId)
      : [...state.favorites, athkarId];
    
    set({ favorites: newFavorites });
    try {
      await storage.set('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
    
    console.log('Favorite toggled:', athkarId, 'Is favorite:', !isFavorite);
  },

  toggleTheme: () => {
    const state = get();
    const newTheme = !state.isDarkMode;
    set({ isDarkMode: newTheme });
    try {
      await storage.set('isDarkMode', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
    
    console.log('Theme toggled:', newTheme ? 'Dark' : 'Light');
  },

  updateDailyStats: (stats: Partial<DailyStats>) => {
    const state = get();
    const today = new Date().toDateString();
    
    // Reset stats if it's a new day
    if (state.dailyStats.date !== today) {
      set({
        dailyStats: {
          date: today,
          completedAthkar: stats.completedAthkar || [],
          tasbeehCount: stats.tasbeehCount || 0,
          totalProgress: stats.totalProgress || 0,
        },
      });
    } else {
      set({
        dailyStats: {
          ...state.dailyStats,
          ...stats,
        },
      });
    }
    
    try {
      await storage.set('daily_stats', JSON.stringify(get().dailyStats));
    } catch (error) {
      console.error('Error saving daily stats:', error);
    }
    console.log('Daily stats updated:', stats);
  },

  getTodayProgress: () => {
    const state = get();
    const today = new Date().toDateString();
    
    if (state.dailyStats.date !== today) {
      return 0;
    }
    
    return state.dailyStats.totalProgress;
  },

  incrementTasbeeh: () => {
    const state = get();
    const newCount = state.tasbeehCount + 1;
    const newSets = Math.floor(newCount / state.tasbeehTarget);
    
    set({ 
      tasbeehCount: newCount,
      tasbeehSets: newSets,
    });
    
    try {
      await storage.set('tasbeeh_count', newCount);
      await storage.set('tasbeeh_sets', newSets);
    } catch (error) {
      console.error('Error saving tasbeeh:', error);
    }
    
    console.log('Tasbeeh incremented:', newCount);
  },

  resetTasbeeh: () => {
    set({ 
      tasbeehCount: 0,
      tasbeehSets: 0,
    });
    
    try {
      await storage.set('tasbeeh_count', 0);
      await storage.set('tasbeeh_sets', 0);
    } catch (error) {
      console.error('Error resetting tasbeeh:', error);
    }
    
    console.log('Tasbeeh reset');
  },

  setTasbeehTarget: (target: number) => {
    set({ tasbeehTarget: target });
    
    try {
      await storage.set('tasbeeh_target', target);
    } catch (error) {
      console.error('Error saving tasbeeh target:', error);
    }
    
    console.log('Tasbeeh target set:', target);
  },

  updateNotificationSettings: (settings: Partial<NotificationSettings>) => {
    const state = get();
    const newSettings = {
      ...state.notifications,
      ...settings,
    };
    
    set({ notifications: newSettings });
    
    try {
      await storage.set('notifications', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
    
    console.log('Notification settings updated:', settings);
  },

  clearAllReminders: () => {
    set({
      notifications: {
        morningEnabled: false,
        eveningEnabled: false,
        soundEnabled: false,
        vibrationEnabled: false,
      },
    });
    
    try {
      await storage.set('notifications', JSON.stringify({
        morningEnabled: false,
        eveningEnabled: false,
        soundEnabled: false,
        vibrationEnabled: false,
      }));
    } catch (error) {
      console.error('Error clearing reminders:', error);
    }
    
    console.log('All reminders cleared');
  },

  loadFromStorage: async () => {
    try {
      const progressStr = await storage.getString('athkar_progress');
      const favoritesStr = await storage.getString('favorites');
      const dailyStatsStr = await storage.getString('daily_stats');
      const isDarkMode = await getBooleanFromStorage('isDarkMode');
      const tasbeehCount = await storage.getString('tasbeeh_count');
      const tasbeehTarget = await storage.getString('tasbeeh_target');
      const tasbeehSets = await storage.getString('tasbeeh_sets');
      const notificationsStr = await storage.getString('notifications');

      if (progressStr) {
        set({ progress: JSON.parse(progressStr) });
      }
      
      if (favoritesStr) {
        set({ favorites: JSON.parse(favoritesStr) });
      }
      
      if (dailyStatsStr) {
        const stats = JSON.parse(dailyStatsStr);
        const today = new Date().toDateString();
        
        // Reset if it's a new day
        if (stats.date !== today) {
          set({
            dailyStats: {
              date: today,
              completedAthkar: [],
              tasbeehCount: 0,
              totalProgress: 0,
            },
          });
        } else {
          set({ dailyStats: stats });
        }
      }
      
      if (isDarkMode !== undefined) {
        set({ isDarkMode });
      }
      
      if (tasbeehCount) {
        set({ tasbeehCount: parseInt(tasbeehCount) });
      }
      
      if (tasbeehTarget) {
        set({ tasbeehTarget: parseInt(tasbeehTarget) });
      }
      
      if (tasbeehSets) {
        set({ tasbeehSets: parseInt(tasbeehSets) });
      }
      
      if (notificationsStr) {
        set({ notifications: JSON.parse(notificationsStr) });
      }
      
      console.log('Data loaded from SQLite storage');
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  },

  saveToStorage: async () => {
    const state = get();
    try {
      await storage.set('athkar_progress', JSON.stringify(state.progress));
      await storage.set('favorites', JSON.stringify(state.favorites));
      await storage.set('daily_stats', JSON.stringify(state.dailyStats));
      await storage.set('isDarkMode', state.isDarkMode);
      await storage.set('tasbeeh_count', state.tasbeehCount.toString());
      await storage.set('tasbeeh_target', state.tasbeehTarget.toString());
      await storage.set('tasbeeh_sets', state.tasbeehSets.toString());
      await storage.set('notifications', JSON.stringify(state.notifications));
      
      console.log('Data saved to SQLite storage');
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },
}));
