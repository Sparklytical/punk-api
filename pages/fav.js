import { Button, Card } from "antd";
import axios from "axios";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { HeartTwoTone } from "@ant-design/icons";

import Layout from "../src/components/Layout";
import { beerDataState, favBeers } from "../store/atom";

const Fav = () => {
  // const [fav, setFav] = useRecoilState(favBeers);

  const [beerData, setBeerData] = useRecoilState(beerDataState);
  const [fav, setFav] = useRecoilState(favBeers);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // if (localStorage.getItem("fav")) {
    //   setFav(localStorage.getItem("fav"));
    // }
    axios.get(`https://api.punkapi.com/v2/beers`).then((json) => {
      const d = json.data;
      let x = d.filter((elem) => fav.includes(elem.id));
      setFilteredData(x);
      console.log("filteredata", x);
    });
  }, [setFav]);

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

  if (fav === []) {
    return (
      <Layout>
        <h1>No favs</h1>
      </Layout>
    );
  }
  return (
    <Layout>
      <div>
        {filteredData.map((beer) => (
          <Card
            title={beer.name}
            style={{ maxWidth: 200, width: 200, margin: 30 }}
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
            <Button
              onClick={() => favManagement(beer.id)}
              // className={fav.includes(beer.id) ? "enabled" : "disabled"}
            >
              <HeartTwoTone
                twoToneColor={fav.includes(beer.id) ? "#eb2f96" : "#000"}
              />
            </Button>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

// export async function getServerSideProps() {
//   const BEER_API_URL = `https://api.punkapi.com/v2/beers`;
//   // axios.get(BEER_API_URL).then((jsonResponse) => {
//   //   setBeerData(jsonResponse);
//   // });
//   const res = await fetch(`https://api.punkapi.com/v2/beers`);
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default Fav;
