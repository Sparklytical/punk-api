import React from "react";
import NextLink from "next/link";
import Link from "next/link";
import styled from "styled-components";

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;

  h2 {
    color: #847d7f;
    cursor: pointer;
  }
`;

const FavLink = styled.h2`
  font-size: 2rem;
`;

const Header = (props) => {
  return (
    <Navbar>
      <NextLink href="/">
        <h2>{props.text}</h2>
      </NextLink>
      <FavLink>
        <NextLink href="/fav">Favourites</NextLink>
      </FavLink>
    </Navbar>
  );
};

export default Header;
