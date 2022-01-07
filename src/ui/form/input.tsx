import { ChangeEvent, InputHTMLAttributes } from "react";
import styles from './form.module.scss'

interface IInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "onChange"> {
  name: string;
  label: string;
  onChange: (name: string, value: string) => void;
}

export function Input({
  name,
  label,
  onChange,
  autoComplete,
  ...restProps
}: IInput) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <label>
      <span className={styles.labelText}>{label}</span>
      <input
        name={name}
        onChange={handleChange}
        autoComplete="off"
        {...restProps}
      />
    </label>
  );
}
