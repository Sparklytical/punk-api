import React from "react";
import Header from "./Header";
import { Layout as AntLayout } from "antd";

const Layout = ({ children }) => {
  return (
    <AntLayout>
      <Header text="Beers from API" />
      <div>{children}</div>
    </AntLayout>
  );
};

export default Layout;
