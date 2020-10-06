import { HeartTwoTone } from "@ant-design/icons";
import { Button, Card } from "antd";
import axios from "axios";
import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect, useReducer, useState } from "react";

import Layout from "../src/components/Layout";
import Search from "../src/components/Search";
import { initialState, reducer } from "../store/reducer";

import { useRecoilState } from "recoil";
import { beerDataState } from "../store/atom";
import { favBeers } from "../store/atom";

// import spinner from "../assets/ajax-loader.gif";
export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pageIndex, setPageIndex] = useState(1);
  const [fav, setFav] = useRecoilState(favBeers);
  const [beerData, setBeerData] = useRecoilState(beerDataState);

  const BEER_API_URL = `https://api.punkapi.com/v2/beers?page=${pageIndex}&per_page=10`;

  useEffect(() => {
    axios.get(BEER_API_URL).then((jsonResponse) => {
      console.log(jsonResponse.data);
      // dispatch({
      //   type: "SEARCH_BEER_SUCCESS",
      //   payload: jsonResponse.data,
      // });
      setBeerData(jsonResponse);
      // localStorage.setItem("fav", fav);
    });
  }, [BEER_API_URL]);

  const search = (searchValue) => {
    // dispatch({
    //   type: "SEARCH_BEER_REQUEST",
    // });

    axios(`https://api.punkapi.com/v2/beers?beer_name=${searchValue}`).then(
      (jsonResponse) => {
        if (jsonResponse.data) {
          // dispatch({
          //   type: "SEARCH_BEER_SUCCESS",
          //   payload: jsonResponse.data,
          // });
          setBeerData({ data: jsonResponse.data, loading: false });
        } else {
          // dispatch({
          //   type: "SEARCH_BEER_FAILURE",
          //   error: jsonResponse.data,
          // });
          setBeerData({ data: jsonResponse.data, loading: false });
        }
      }
    );
  };

  // const setFavId = (id) => {
  //   setFav((result) => [...result, id]);
  //   console.log(fav);
  // };

  const favManagement = (id) => {
    if (fav.includes(id)) {
      setFav(fav.filter((e) => e !== id));
      // localStorage.setItem("fav", fav);
      console.log("fav beers", fav);
    } else {
      setFav((i) => [...i, id]);
      // localStorage.setItem("fav", fav);
      console.log("fav beers", fav);
    }
  };

  // const { beers, errorMessage, loading } = state;

  const retrievedBeers = beerData.loading ? (
    <p>Loading....</p>
  ) : (
    beerData.data.map((beer, index) => (
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
        {/* <div ke={beer.id}>
                <Button type="primary">{beer.name}</Button>
                <div><img src={beer.image_url} alt={beer.name} /> </div>*/}
        {/* </div> */}
        <Button
          onClick={() => favManagement(beer.id)}
          // className={fav.includes(beer.id) ? "enabled" : "disabled"}
        >
          <HeartTwoTone
            twoToneColor={fav.includes(beer.id) ? "#eb2f96" : "#000"}
          />
        </Button>
      </Card>
    ))
  );

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
          <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
          <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        </div>
      </div>
    </Layout>
  );
}
