import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;
import axios from "axios";
import { Button } from "antd";
import { useRecoilState } from "recoil";
import { beerDataState } from "../../store/atom";

const SearchComponent = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");
  const [beerData, setBeerData] = useRecoilState(beerDataState);

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    // e.preventDefault();
    search(searchValue);
  };

  const handleClearSearch = () => {
    const fetchBeers = async () => {
      const res1 = await axios.get("https://api.punkapi.com/v2/beers");

      setBeerData(res1.data);
    };

    fetchBeers();
  };

  return (
    <div className="search-comp">
      <form className="search">
        <Search
          placeholder="Input Beer Name"
          onSearch={callSearchFunction}
          enterButton="Search"
          size="large"
          onChange={handleSearchInputChanges}
          value={searchValue}
        />
      </form>
      {searchValue && <Button onClick={handleClearSearch}>x</Button>}
    </div>
  );
};

export default SearchComponent;
