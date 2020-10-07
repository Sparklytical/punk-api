import { HeartTwoTone } from "@ant-design/icons";
import { Button, Card } from "antd";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import Layout from "../src/components/Layout";
import { beerDataState, favBeers } from "../store/atom";

const VH = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
`;

const LH = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100vh;
`;
const Fav = () => {
  const [beerData, setBeerData] = useRecoilState(beerDataState);
  const [fav, setFav] = useRecoilState(favBeers);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getFavs = beerData.filter((elem) => fav.includes(elem.id));
    setFilteredData(getFavs);
    console.log("filteredData", filteredData);
  }, [setFav, fav]);

  const favManagement = (id) => {
    if (fav.includes(id)) {
      setFav(fav.filter((e) => e !== id));
      localStorage.setItem("fav", fav);
      console.log("fav beers", fav);
    } else {
      setFav((i) => [...i, id]);
      localStorage.setItem("fav", fav);
      console.log("fav beers", fav);
    }
  };

  return (
    <Layout>
      {fav.length === 0 && (
        <VH>
          <h2>{fav.length === 0 && "No Favourite Beers"}</h2>
        </VH>
      )}
      <LH>
        {filteredData.map((beer) => (
          <Card
            title={beer.name}
            style={{ maxWidth: 200, width: 200, margin: 30, height: 400 }}
            key={beer.id}
            cover={
              <img
                alt="example"
                src={beer.image_url}
                style={{
                  margin: "2rem 4rem",
                  width: "auto",
                  maxWidth: "200px",
                  justifyContent: "center",
                  display: "flex",
                  height: 200,
                  maxHeight: 200,
                }}
              />
            }
            extra={
              <NextLink href="beer/[id]" as={`/beer/${beer.id}`}>
                More
              </NextLink>
            }
          >
            <Button onClick={() => favManagement(beer.id)}>
              <HeartTwoTone
                twoToneColor={fav.includes(beer.id) ? "#eb2f96" : "#000"}
              />
            </Button>
          </Card>
        ))}
      </LH>
    </Layout>
  );
};

export default Fav;
