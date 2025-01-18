import "./index.scss";
import { Input, InputProps } from "antd";

export default function BaseInput({ className, ...rest }: InputProps) {
  const customClassName = className ? `base-input ${className}` : "base-input";

  return <Input {...rest} className={customClassName} />;
}
