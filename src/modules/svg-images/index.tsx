import React, { useRef, DragEvent, useState } from "react";
import man from "./assets/man.png";
import background from "./assets/background.png";
import { saveAs } from "file-saver";
import { SvgFrame } from "./svg-frame";
import "./App.css";

interface IImage {
  src: string;
  id: string;
  type: "character" | "background";
}

const images: IImage[] = [
  {
    src: man,
    id: "image1",
    type: "character",
  },
  {
    src: background,
    id: "image2",
    type: "background",
  },
];

function use2DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const context = canvas ? canvas.getContext("2d") : null;

  return {
    canvasRef,
    canvas,
    context,
  };
}

export function SVGImages() {
  const [draggedId, setDraggedId] = useState<string>();
  const { canvasRef, context, canvas } = use2DCanvas();

  const handleDragStart = (event: DragEvent<HTMLImageElement>) => {
    console.log(event);
    // @ts-ignore
    const imageId = event.target.id;

    setDraggedId(imageId);
  };

  const handleDragEnd = () => {
    setTimeout(setDraggedId, 500);
  };

  const handleImageDrop = (event: DragEvent<HTMLCanvasElement>) => {
    // event.preventDefault();
    const imageId = draggedId;
    const imageData = images.find(({ id }) => id === imageId);

    if (!imageData || !context) return;

    const image = new Image();
    image.src = imageData.src;

    context.drawImage(image, 0, 0);

    console.log("file id is:", draggedId);
  };

  function dragover_handler(ev: any) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }

  const getPng = () => {
    const pngImg = canvas?.toDataURL("image/png");
    if (pngImg) {
      saveAs(pngImg);
    }
  };

  return (
    <div className="App">
      <div id="images">
        {images.map(({ src, id }) => (
          <img
            id={id}
            src={src}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggable
            alt="Billede"
          />
        ))}
      </div>

      <SvgFrame />

      <canvas
        ref={canvasRef}
        width="600"
        height="300"
        onDrop={handleImageDrop}
        onDragOver={dragover_handler}
      />
      <div>
        <button onClick={getPng}>Download png</button>
      </div>
    </div>
  );
}
