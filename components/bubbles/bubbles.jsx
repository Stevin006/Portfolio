import React, { useEffect, useRef } from "react";
import useViewportSize from "../useViewPortSize/useViewportSize";
import drawBubbles from "./drawBubbles";

const Bubbles = () => {
  const { width, height } = useViewportSize();
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef && width && height) {
      drawBubbles(canvasRef, width, height);
    }
  }, [height, width, canvasRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ position: "absolute", zIndex: -100 }}
      />
    </>
  );
};

export default Bubbles;
