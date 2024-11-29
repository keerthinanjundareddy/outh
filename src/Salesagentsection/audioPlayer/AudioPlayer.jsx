import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioPlayer = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioUrl) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#9b59b6',
        progressColor: '#8e44ad',
        height: 70, // Reduce the height of the waveform
        backend: 'MediaElement',
      });

      const handleError = (error) => {
        console.error('Error loading audio:', error);
      };

      waveSurferRef.current.on('error', handleError);
      waveSurferRef.current.on('play', () => setIsPlaying(true));
      waveSurferRef.current.on('pause', () => setIsPlaying(false));

      waveSurferRef.current.load(audioUrl);

      return () => {
        waveSurferRef.current.destroy();
      };
    }
  }, [audioUrl]);

  useEffect(() => {
    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
    }
  };

  return (
    <div style={{ height: '70px', width:"100%"}}> {/* Reduce the height of the component */}
      <div ref={waveformRef} />
      <div>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;