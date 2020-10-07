import { Descriptions, Image } from "antd";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import Layout from "../../src/components/Layout";
import { beerDataState } from "../../store/atom";

const BeerContainer = styled.div`
  display: flex;
  margin: 5rem;
  height: 90vh;
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Beer = () => {
  const router = useRouter();
  const { id } = router.query;

  const [beerData, setBeerData] = useRecoilState(beerDataState);

  useEffect(() => {
    if (beerData === null || beerData === undefined) {
      const fetchBeers = async () => {
        const res1 = await axios.get("https://api.punkapi.com/v2/beers");
        setBeerData(res1.data);
        console.log(beerData);
      };

      fetchBeers();
    }
  }, []);

  var filterData = beerData.filter(function (obj) {
    return obj.id === parseInt(id);
  });

  return (
    <Layout>
      {filterData.map((i) => (
        <BeerContainer>
          <Head>
            <title>{i.name}</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Descriptions
            title="Beer Info"
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Name" span={5}>
              {i.name}
            </Descriptions.Item>
            <Descriptions.Item label="Image" span={2}>
              <Image width={"auto"} height={300} src={i.image_url} />
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {i.description}
            </Descriptions.Item>
            <Descriptions.Item label="Tagline" span={2}>
              {i.tagline}
            </Descriptions.Item>
            <Descriptions.Item label="Tips" span={2}>
              {i.brewers_tips}
            </Descriptions.Item>
            <Descriptions.Item label="Food Pairings" span={1}>
              {i.food_pairing}
            </Descriptions.Item>
            <Descriptions.Item label="First Brewed" span={2}>
              {i.first_brewed}
            </Descriptions.Item>
          </Descriptions>
        </BeerContainer>
      ))}
    </Layout>
  );
};

export default Beer;
