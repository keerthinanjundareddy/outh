import React, { useState, useRef } from 'react';
import recorder from '../../Assets/recorder.png';
import recorderOn from '../../Assets/recordingOn.png';
import styles from './micInput.module.css';
import axios from 'axios';
import { uid } from 'uid';

const MicInput = ({ messages, setMessages, setApiResponse }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const sendAudio = async (audioBlob, id) => {
    const formData = new FormData();
    formData.append('audio_file', audioBlob);
    formData.append('record_audio', true);
  ///api/rag.voice_chain/run
    try {
      const response = await axios.post('https://document-qa.apprikart.com/api/rag.voice_chain/run', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
         // Ensure the response is treated as a binary Blob
      });
      console.log(response.data)
      const res = response.data.text

      const englishResponse = res.split('English Response:')[1].split('Hindi Response:')[0].trim();
    const hindiResponse = res.split('Hindi Response:')[1].trim();
      let result = {
        english:englishResponse,
        hindi:hindiResponse
      }
      setApiResponse((prevValue)=>({
        ...prevValue,
        [id]:result,
      }))
  
      console.log('Upload Successful', response.data, res);
    } catch (error) {
      console.error('Error', error);
      setApiResponse((prevValue)=>({
        ...prevValue,
        [id]:"Internal Server Error",
      }))
    }
  };

  
  const handleStartRecording = async () => {
    const id = uid()
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log(audioUrl)
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id:id,
            timestamp: new Date().toLocaleTimeString(),
            audio: audioUrl,
            type:'text',
          },
        ]);
        audioChunksRef.current = [];
        sendAudio(audioBlob, id); // Optional: Send the audio file to the server
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
