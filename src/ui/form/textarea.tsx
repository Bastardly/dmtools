import { useClassName } from "hooks/useClassName";
import { ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./form.module.scss";

interface ITextarea {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  autoComplete?: string;
  className?: string;
  disabled?: boolean;
  hidden?: boolean;
  noCard?: boolean;
}

export function Textarea({
  value,
  onChange,
  className,
  autoComplete,
  noCard,
  ...restProps
}: ITextarea) {
  const classNames = useClassName(!noCard &&"card", styles.textField, className);
  return (
    <TextareaAutosize
      className={classNames}
      autoComplete={autoComplete || "off"}
      onChange={onChange}
      value={value}
      {...restProps}
    />
  );
}
