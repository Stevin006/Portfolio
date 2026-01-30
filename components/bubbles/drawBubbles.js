import bubbleImg from "./bub.webp";

const drawBubbles = (canvasRef, width, height) => {
  let globalCounter = 0;
  let ctx, BubbleImgObj;
  let bubbles = [];

  const addBubbleToCanvas = (x, y, size = 100) => {
    ctx.drawImage(BubbleImgObj, x, y, size, size);
  };

  const createBubble = () => {
    const rnd = (low, high) => {
      return Math.random() * (high - low) + low;
    };

    const bubbleSpeed = rnd(2, 4) * -1;
    const size = rnd(5, 200);
    bubbles.push({
      x: height,
      y: rnd(0, width * 2) - width,
      swaySpeed: rnd(50, 100),
      swayAmount: rnd(50, 100),
      bubbleSpeed,
      size
    });
  };

  const update = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    globalCounter++;

    const globalSway = Math.sin(globalCounter / 1000) * (width / 1.5);
    bubbles.forEach((b, k) => {
      const xSwayModify = b.swayAmount * Math.sin(b.x / b.swaySpeed);
      addBubbleToCanvas(
        b.y + xSwayModify + globalSway,
        b.x,
        (b.size + b.x) / 8,
        b.opacity
      );
      bubbles[k]["x"] = bubbles[k]["x"] + b.bubbleSpeed;
      if (b.x < -20) {
        delete bubbles[k];
        createBubble();
      }
    });

    requestAnimationFrame(update);
  };

  const initApp = () => {
    ctx = canvasRef.current.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.globalAlpha = 0.5;

    // load bubbleImg
    BubbleImgObj = new Image();
    BubbleImgObj.src = bubbleImg;

    for (let x = 0; x < 80; x++) {
      setTimeout(() => {
        createBubble();
      }, x * 150);
    }

    if (canvasRef) {
      update();
    }
  };

  initApp();
};

export default drawBubbles;
