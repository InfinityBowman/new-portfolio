import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

const AudioPlayer = ({ url, title }: { url: string; title: string }) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !wavesurfer.current && waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#dddddd',
        progressColor: '#4f4a85',
        cursorColor: '#fff',
        cursorWidth: 2,
        barWidth: 3,
        barRadius: 2,
        height: 70,
        normalize: false,
      });

      wavesurfer.current.on('ready', () => {
        setDuration(wavesurfer.current?.getDuration() || 0);
        setLoading(false);
      });

      wavesurfer.current.on('audioprocess', () => {
        setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
      });
    }

    if (wavesurfer.current) {
      wavesurfer.current.load(url);
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current;
      }
    };
  }, [isClient, url]);

  if (!isClient) {
    return null;
  }

  const handlePlayPause = () => {
    setPlaying(!playing);
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section
      className="p-4 text-center flex flex-col gap-2"
      role="region"
      aria-label={`Audio player for ${title}`}
    >
      <div className="z-10 flex items-center justify-start">
        <button
          onClick={handlePlayPause}
          disabled={loading}
          className="p-3 bg-opacity-0 text-primary border rounded-full hover:bg-background-hover duration-0 flex"
          aria-label={`${playing ? 'Pause' : 'Play'} ${title}`}
          aria-pressed={playing}
        >
          {playing ?
            <Pause size={20} />
          : <Play size={20} />}
        </button>
        <span
          className="ml-4 text-primary"
          aria-label="Track title"
        >
          {title}
        </span>
      </div>
      <div
        ref={waveformRef}
        className={loading ? 'opacity-50' : ''}
        role="progressbar"
        aria-label="Audio visualization"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={duration ? (currentTime / duration) * 100 : 0}
      ></div>
      <div
        className="flex justify-between mt-2"
        role="timer"
      >
        <span
          className="text-primary text-sm"
          aria-label="Current time"
        >
          {formatTime(currentTime)}
        </span>
        <span
          className="text-primary text-sm"
          aria-label="Total duration"
        >
          {formatTime(duration)}
        </span>
      </div>
    </section>
  );
};

export default AudioPlayer;
