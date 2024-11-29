import axios from "axios";
import React, { useRef, useState } from "react";
import { uid } from "uid";

const AudioInput = ({ setApiResponse, setMessages }) => {
  const sendAudio = async (audioBlob, id) => {
    const formData = new FormData();
    formData.append("audio_file", audioBlob);
    formData.append("record_audio", true);

    try {
      const response = await axios.post(
        "https://document-qa.apprikart.com/api/rag.voice_chain/run",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // Ensure the response is treated as a binary Blob
          responseType: 'blob', 
        }
      );
      console.log(response);
      const res = response.data;

      //   const englishResponse = res.split('English Response:')[1].split('Hindi Response:')[0].trim();
      // const hindiResponse = res.split('Hindi Response:')[1].trim();
      //   let result = {
      //     english:englishResponse,
      //     hindi:hindiResponse
      //   }

      // Check the type of response data
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioBlobUrl = URL.createObjectURL(audioBlob);

      // Optionally, add the audio element to the DOM if needed
      setApiResponse((prevValue) => ({
        ...prevValue,
        [id]: audioBlobUrl,
      }));
      console.log("Upload Successful", response.data.text, res);
    } catch (error) {
      console.error("Error", error);
      setApiResponse((prevValue) => ({
        ...prevValue,
        [id]: "Internal Server Error",
      }));
    }
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected audio file:", file);
      setSelectedFile(file);
      const audioUrl = URL.createObjectURL(file);
      const id = uid();
      const newMess = {
        id: id,
        timestamp: new Date().toLocaleTimeString(),
        audio: audioUrl,
        type: "text",
      };
      setMessages((prevValue) => [...prevValue, newMess]);
      sendAudio(file, id);
      // Add further processing here
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button className="upload-button" onClick={handleButtonClick}>
        Upload Audio
      </button>
    </div>
  );
};

export default AudioInput;
