import feather from "feather-icons";
import { IIcon } from "./types";
import { useClassName } from "hooks/useClassName";
import "./icon.scss";

export function Icon({
  name,
  strokeWidth = 2,
  width = 24,
  height = 24,
  rotate,
  className,
  buttonClassName,
  block,
  onClick,
}: IIcon) {
  const classNames = useClassName(
    className,
    onClick && "clickable",
    rotate && "rotate",
    "feather",
    "feather-loader"
  );
  const buttonClassNames = useClassName(
    buttonClassName,
    onClick && "clickable"
  );
  const containerClassNames = useClassName("baseIcon", block && "block");

  const createMarkup = () => ({
    __html: feather.icons[name].toSvg({
      width,
      "stroke-width": strokeWidth,
      height,
      class: classNames || "",
    }),
  });

  const Span = (
    <span
      onClick={onClick}
      className={containerClassNames}
      dangerouslySetInnerHTML={createMarkup()}
    />
  );

  if (!onClick) return Span;

  return <button className={buttonClassNames}>{Span}</button>;
}
