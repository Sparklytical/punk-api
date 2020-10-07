import { HeartTwoTone } from "@ant-design/icons";
import { Button, Card } from "antd";
import axios from "axios";
import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect, useReducer, useState } from "react";

import Layout from "../src/components/Layout";
import Search from "../src/components/Search";
import Pagination from "../src/components/Pagination";
import { initialState, reducer } from "../store/reducer";

import { useRecoilState } from "recoil";
import { beerDataState } from "../store/atom";
import { favBeers } from "../store/atom";

// import spinner from "../assets/ajax-loader.gif";
export default function Home({ item }) {
  const [fav, setFav] = useRecoilState(favBeers);
  const [beerData, setBeerData] = useRecoilState(beerDataState);

  const [beersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * beersPerPage;
  const indexOfFirstPost = indexOfLastPost - beersPerPage;
  const currentBeers = beerData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchBeers = async () => {
      const res1 = await axios.get("https://api.punkapi.com/v2/beers");
      setBeerData(res1.data);
    };

    fetchBeers();
  }, []);

  const search = (searchValue) => {
    axios(`https://api.punkapi.com/v2/beers?beer_name=${searchValue}`).then(
      (jsonResponse) => {
        if (jsonResponse.data) {
          setBeerData(jsonResponse.data);
        } else {
          setBeerData(jsonResponse.data);
        }
      }
    );
  };

  const favManagement = (id) => {
    if (fav.includes(id)) {
      setFav(fav.filter((e) => e !== id));

      console.log("fav beers", fav);
    } else {
      setFav((i) => [...i, id]);

      console.log("fav beers", fav);
    }
  };

  const deleteItem = (id) => {
    const newList = beerData.filter(function (el) {
      return el.id != id;
    });
    setBeerData(newList);
  };

  const retrievedBeers = currentBeers.map((beer, index) => (
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
      <Button onClick={() => deleteItem(beer.id)}>X</Button>
      <Button onClick={() => favManagement(beer.id)}>
        <HeartTwoTone
          twoToneColor={fav.includes(beer.id) ? "#eb2f96" : "#000"}
        />
      </Button>
    </Card>
  ));
  // Change page

  return (
    <Layout>
      <div className="App">
        <Head>
          <title>Beer</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="m-container">
          <Search search={search} />

          <div className="beer">{retrievedBeers}</div>
          <Pagination
            beersPerPage={beersPerPage}
            totalPosts={beerData.length}
            paginate={paginate}
          />
        </div>
      </div>
    </Layout>
  );
}
