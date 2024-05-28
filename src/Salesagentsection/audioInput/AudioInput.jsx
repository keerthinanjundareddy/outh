import React, { useRef, useState } from 'react';

const AudioInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected audio file:', file);
      setSelectedFile(file);
      // Add further processing here
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button className="upload-button" onClick={handleButtonClick}>
        Upload Audio
      </button>
    </div>
  );
};

export default AudioInput;
