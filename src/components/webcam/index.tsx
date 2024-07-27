// components/WebcamComponent.tsx
import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";

interface WebcamComponentProps {
  onCapture: (imageSrc: string) => void;
}

const WebcamComponent: React.FC<WebcamComponentProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
      }
    }
  }, [webcamRef, onCapture]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <Button variant="contained" onClick={capture}>
        Capture photo
      </Button>
    </div>
  );
};

export default WebcamComponent;
