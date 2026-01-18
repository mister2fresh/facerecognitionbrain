import { useEffect, useRef, useState } from 'react';
import './FaceRecognition.css';
import { FaceDetection } from "@mediapipe/face_detection";

const FaceRecognition = ({ imageUrl, boxes, setBoxes }) => {
  const imgRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
    setBoxes([]);
  }, [imageUrl]); 

  useEffect(() => {
    if (!imageUrl || !imgLoaded || !imgRef.current) return;

    let isMounted = true;
    const faceDetection = new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
    });

    faceDetection.onResults((results) => {
      if (isMounted && results.detections) {
        const mappedBoxes = results.detections.map((detection) => {
          const box = detection.boundingBox;
          return {
            leftCol: box.xCenter - box.width / 2,
            topRow: box.yCenter - box.height / 2,
            width: box.width,
            height: box.height,
          };
        });
        setBoxes(mappedBoxes);
      }
    });

    faceDetection.send({ image: imgRef.current });

    return () => {
      isMounted = false;
      faceDetection.close();
    };

  }, [imageUrl, imgLoaded]); 

  const handleImageLoad = () => {
    setImgLoaded(true);
  };

  return (
    <div className="center">
      <div style={{ position: "relative", display: "inline-block" }}>
        {imageUrl && (
          <img
            ref={imgRef}
            src={imageUrl}
            alt="Face Detection"
            width="500px"
            crossOrigin="anonymous"
            onLoad={handleImageLoad}
          />
        )}
        {boxes.map((box, i) => (
          <div
            key={i}
            className="bounding-box"
            style={{
              position: "absolute",
              border: "3px solid #149df2",
              left: `${box.leftCol * 100}%`,
              top: `${box.topRow * 100}%`,
              width: `${box.width * 100}%`,
              height: `${box.height * 100}%`,
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;