import "./index.scss";
import { Button, ButtonProps } from "antd";


export default function BaseButton(props: ButtonProps) {
  const { children, className, ...rest } = props;
  const customClassName = className ? `${className} base-btn` : "base-btn";

  return (
    <Button {...rest} className={customClassName}>
      {children}
    </Button>
  );
}
