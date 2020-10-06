import React from "react";
import Header from "./Header";
import { Layout as antLayout } from "antd";

const Layout = ({ children }) => {
  return (
    <antLayout>
      <Header text="Beer" />
      <div>{children}</div>
    </antLayout>
  );
};

export default Layout;
