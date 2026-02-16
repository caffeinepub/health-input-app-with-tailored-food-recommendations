import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useSoundtrackPreferences } from '../hooks/useSoundtrackPreferences';

export function SoundtrackControls() {
  const { preferences, setEnabled, setVolume, toggleMuted } = useSoundtrackPreferences();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/audio/barrera-healthy-eats-theme.mp3');
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    if (preferences.enabled) {
      audio.volume = preferences.muted ? 0 : preferences.volume;
      audio.play().catch((error) => {
        console.error('Failed to play audio:', error);
      });
    } else {
      audio.pause();
    }

    return () => {
      if (audio && !preferences.enabled) {
        audio.pause();
      }
    };
  }, [preferences.enabled]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = preferences.muted ? 0 : preferences.volume;
    }
  }, [preferences.volume, preferences.muted]);

  const handleTogglePlay = () => {
    setEnabled(!preferences.enabled);
  };

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleTogglePlay}
        className="h-9 w-9"
        aria-label={preferences.enabled ? 'Pause music' : 'Play music'}
      >
        {preferences.enabled ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Volume controls"
          >
            <Music className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Volume</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMuted}
                className="h-8 w-8"
                aria-label={preferences.muted ? 'Unmute' : 'Mute'}
              >
                {preferences.muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <VolumeX className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[preferences.muted ? 0 : preferences.volume]}
                onValueChange={handleVolumeChange}
                max={1}
                step={0.01}
                className="flex-1"
                disabled={preferences.muted}
              />
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              {preferences.muted
                ? 'Muted'
                : `${Math.round(preferences.volume * 100)}%`}
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
