import { Select, SelectProps } from "antd";
import "./index.scss";

export default function BaseSelect({ className, children, ...rest }: SelectProps) {
  const customClassName = className ? `${className} base-select` : 'base-select';

  return <Select {...rest} className={customClassName}>{children}</Select>;
}
