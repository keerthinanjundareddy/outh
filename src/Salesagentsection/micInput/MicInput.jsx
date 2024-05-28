import React, { useState, useRef } from 'react';
import recorder from '../../Assets/recorder.png';
import recorderOn from '../../Assets/recordingOn.png';
import styles from './micInput.module.css';
import axios from 'axios';

const MicInput = ({ messages, setMessages }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const sendAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio_file', audioBlob);
    formData.append('record_audio', true);
    try {
      const response = await axios.post('https://document-qa.apprikart.com/api/rag.qa_chain/run', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload Successful', response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            timestamp: new Date().toLocaleTimeString(),
            audio: audioUrl,
          },
        ]);
        audioChunksRef.current = [];
        sendAudio(audioBlob); // Optional: Send the audio file to the server
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <img
        className={styles.recorderImg}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        src={isRecording ? recorderOn : recorder}
        alt=""
      />
    </div>
  );
};

export default MicInput;
