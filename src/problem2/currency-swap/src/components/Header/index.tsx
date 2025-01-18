import { Menu, MenuProps } from "antd";
import "./index.scss";
import { useState } from "react";

export default function BaseHeader() {
  const [current, setCurrent] = useState<string>('personal');
  const items = [
    { key: "personal", label: "Personal" },
    { key: "business", label: "Business" },
    { key: "platform", label: "Platform" },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="base-header">
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </div>
  );
}
