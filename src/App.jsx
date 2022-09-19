import { useEffect, useRef } from 'react';
import * as faceapi from "face-api.js"
import './App.css';


function App() {
  const imgRef=useRef();
  const canvasRef=useRef();
  

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    //canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    //faceapi.draw.drawDetections(canvasRef.current, detections)
      console.log(detections)
  };
  
  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };
    imgRef.current && loadModels();
  },[]);

  return (
    <div className="App">
      <img 
        crossOrigin="anonymous"
        ref={imgRef}
        src="https://media.istockphoto.com/photos/closeup-self-portrait-of-smiling-young-multiethnic-female-friends-picture-id1209000983?k=20&m=1209000983&s=612x612&w=0&h=SYAfHiGjAq9X3Q1aOkCxfdDyGmb0M4goocvidSN3EJI="
        alt=""
        width="940"
        height="650" 
      />
      <canvas ref={canvasRef} width="940" height="650"/>
    </div>
  );
}

export default App;
