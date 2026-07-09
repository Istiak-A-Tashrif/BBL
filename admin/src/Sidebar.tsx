import { DashboardOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu, type MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDarkMode from "./hooks/useDarkMode";

const SideBar: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkMode = useDarkMode();

  useEffect(() => {
    const currentKey = location.pathname + location.search || "";
    setSelectedKeys([currentKey]);
  }, [location.pathname, location.search]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: <span title="Dashboard">Dashboard</span>,
    },
    {
      key: "/cms/site",
      icon: <HomeOutlined />,
      label: <span title="Site CMS">Site CMS</span>,
    },
    {
      key: "/cms/home",
      icon: <HomeOutlined />,
      label: <span title="Home CMS">Home CMS</span>,
    },
    {
      key: "/cms/about",
      icon: <HomeOutlined />,
      label: <span title="About CMS">About CMS</span>,
    },
    {
      key: "/cms/projects",
      icon: <HomeOutlined />,
      label: <span title="Projects CMS">Projects CMS</span>,
    },
    {
      key: "/cms/contact",
      icon: <HomeOutlined />,
      label: <span title="Contact CMS">Contact CMS</span>,
    },
  ];

  return (
    <Menu
      onClick={({ key }) => {
        navigate(key);
      }}
      style={{ border: 0 }}
      mode="inline"
      theme={isDarkMode ? "dark" : "light"}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={menuItems}
    />
  );
};

export default SideBar;
