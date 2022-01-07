import { useRef, useMemo } from "react";
import { useClassName } from "hooks/useClassName";
import { useIsActive } from "hooks/useIsActive";

interface ISvgFrameImage {
  src: string;
  index?: number;
}

export function SvgFrameImage({ src }: ISvgFrameImage) {
  const { isActive, setActive, setInactive } = useIsActive(false);
  const imageRef = useRef<SVGImageElement>(null);
  const { naturalWidth, naturalHeight } = useMemo(() => {
    const img = new Image();
    img.src = src;

    return img;
  }, [src]);

  const classNames = useClassName(isActive && "activeSvg");

  return (
    <image
      className={classNames}
      ref={imageRef}
      width={naturalWidth}
      height={naturalHeight}
      href={src}
      onMouseOver={() => console.log("hovering")}
    />
  );
}
