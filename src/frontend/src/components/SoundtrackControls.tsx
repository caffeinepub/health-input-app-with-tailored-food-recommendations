import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Music, Volume2, VolumeX, Play, Pause, AlertCircle } from 'lucide-react';
import { useSoundtrackPreferences } from '../hooks/useSoundtrackPreferences';
import { useI18n } from '../hooks/useI18n';

export function SoundtrackControls() {
  const { t } = useI18n();
  const { preferences, setEnabled, setVolume, toggleMuted } = useSoundtrackPreferences();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio('/assets/audio/barrera-healthy-eats-theme.mp3');
      audio.loop = true;
      
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.addEventListener('error', () => {
        setError(t('audioLoadError'));
        setIsPlaying(false);
      });
      
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('play', () => setIsPlaying(true));
        audioRef.current.removeEventListener('pause', () => setIsPlaying(false));
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, [t]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = preferences.muted ? 0 : preferences.volume;
    }
  }, [preferences.volume, preferences.muted]);

  const handleTogglePlay = async () => {
    if (!audioRef.current) return;

    setError(null);

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setEnabled(false);
      } else {
        audioRef.current.volume = preferences.muted ? 0 : preferences.volume;
        await audioRef.current.play();
        setEnabled(true);
      }
    } catch (err) {
      console.error('Playback error:', err);
      setError(t('audioPlayError'));
      setEnabled(false);
      setIsPlaying(false);
    }
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
        aria-label={isPlaying ? t('pauseMusic') : t('playMusic')}
      >
        {isPlaying ? (
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
            aria-label={t('volumeControls')}
          >
            <Music className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('volume')}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMuted}
                className="h-8 w-8"
                aria-label={preferences.muted ? t('unmute') : t('mute')}
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
                ? t('muted')
                : `${Math.round(preferences.volume * 100)}%`}
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
