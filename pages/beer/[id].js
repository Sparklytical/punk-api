import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../src/components/Layout";
const Beer = ({ query }) => {
  const BEER_API_URL = `https://api.punkapi.com/v2/beers`;
  const [name, setName] = useState();
  const router = useRouter();
  const { id } = router.query;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: result, error } = useSWR(`${BEER_API_URL}/${id}`, fetcher);

  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <h1>Loading...</h1>;
  const res = result[0];

  // useEffect(() => setName(res.name), []);
  // console.log("beer result", res);

  // useEffect(() => {
  //   axios.get(BEER_API_URL).then();
  // });

  return (
    <Layout>
      <Head>
        <title>{res.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h3>{res.name}</h3>
      <p>Beer: {id}</p>
      <img src={res.image_url} alt={res.name} />
    </Layout>
  );
};

export default Beer;
