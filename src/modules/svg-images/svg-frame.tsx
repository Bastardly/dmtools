import React, { Fragment, ReactNode, useRef, useState } from "react";
import man from "assets/man.png";
import background1 from "assets/background.png";

export function SvgFrame() {
  const [children, setChildren] = useState<ReactNode[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const handleAddBackground = () => {
    const background = <image width="600" height="300" href={background1} />;
    setChildren((prevChildren) => [background, ...prevChildren]);
  };

  const handleAddMan = () => {
    const img = new Image();
    img.src = man;
    const { naturalWidth, naturalHeight } = img;
    const theMan = (
      <image
        width={naturalWidth}
        height={naturalHeight}
        href={man}
        onMouseOver={() => console.log("hovering")}
      />
    );
    setChildren((prevChildren) => [...prevChildren, theMan]);
  };

  return (
    <>
      <svg ref={svgRef} width="600" height="300">
        {children.map((child, index) => (
          <Fragment key={index}>{child}</Fragment>
        ))}
      </svg>
      <div>
        <button onClick={handleAddBackground}>Add background</button>
        <button onClick={handleAddMan}>Add Character</button>
      </div>
    </>
  );
}
