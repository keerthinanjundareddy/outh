import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioPlayer = ({ audio }) => {
    console.log("audio inside player",audio)
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    if (audio) {
      const waveSurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#A8DBA8',
        progressColor: '#3B8686',
        cursorColor: 'navy',
        barWidth: 2,
        responsive: true,
        height: 80,
        normalize: true,
        partialRender: true,
        backend: 'MediaElement',
        xhr: {
          signal: abortController.signal,
        },
      });

      waveSurferRef.current = waveSurfer;

      waveSurfer.load(audio, abortController.signal);

      waveSurfer.on('ready', () => {
        waveSurfer.play();
      });
    }

    return () => {
      abortController.abort();
      waveSurferRef.current?.destroy();
    };
  }, [audio]);

  return (
    <div className="chatbot-audio-response">
      <div ref={waveformRef} />
    </div>
  );
};

export default AudioPlayer;