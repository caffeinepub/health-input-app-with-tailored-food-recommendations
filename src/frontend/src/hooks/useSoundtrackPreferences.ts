import { useState, useEffect } from 'react';

interface SoundtrackPreferences {
  enabled: boolean;
  volume: number;
  muted: boolean;
}

const STORAGE_KEY = 'barrera-healthy-eats-soundtrack-prefs';

const DEFAULT_PREFERENCES: SoundtrackPreferences = {
  enabled: false,
  volume: 0.5,
  muted: false,
};

export function useSoundtrackPreferences() {
  const [preferences, setPreferences] = useState<SoundtrackPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load soundtrack preferences:', error);
    }
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save soundtrack preferences:', error);
    }
  }, [preferences]);

  const setEnabled = (enabled: boolean) => {
    setPreferences((prev) => ({ ...prev, enabled }));
  };

  const setVolume = (volume: number) => {
    setPreferences((prev) => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  };

  const setMuted = (muted: boolean) => {
    setPreferences((prev) => ({ ...prev, muted }));
  };

  const toggleMuted = () => {
    setPreferences((prev) => ({ ...prev, muted: !prev.muted }));
  };

  return {
    preferences,
    setEnabled,
    setVolume,
    setMuted,
    toggleMuted,
  };
}
