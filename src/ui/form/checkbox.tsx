import { ChangeEvent, InputHTMLAttributes } from "react";
import "./checkbox.scss";

interface IInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "onChange"> {
  id: string;
  label: string;
  onChange: (id: string, checked: boolean) => void;
  checked: boolean;
}

export function Checkbox({
  id,
  label,
  onChange,
  autoComplete,
  checked,
  ...restProps
}: IInput) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.checked);
  };

  return (
    <span className="checkboxWrapper">
      <input
        {...restProps}
        id={id}
        onChange={handleChange}
        autoComplete="off"
        type="checkbox"
        checked={checked}
      />
      <label className="checkboxLabel" htmlFor={id}>{label}</label>
    </span>
  );
}
