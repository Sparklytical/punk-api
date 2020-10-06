import React from "react";
import NextLink from "next/link";
import Link from "next/link";

const Header = (props) => {
  return (
    <>
      <NextLink href="/">
        <h2>{props.text}</h2>
      </NextLink>
      <NextLink href="/fav">Fav</NextLink>
    </>
  );
};

export default Header;
