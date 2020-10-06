import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

const SearchComponent = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    // e.preventDefault();
    search(searchValue);
    resetInputField();
  };

  return (
    <div className="search-comp">
      <form className="search">
        {/* <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      /> */}
        <Search
          placeholder="Input Beer Name"
          onSearch={callSearchFunction}
          enterButton="Search"
          size="large"
          onChange={handleSearchInputChanges}
          value={searchValue}
        />
        {/* <input onClick={callSearchFunction} type="submit" value="SEARCH" /> */}
      </form>
    </div>
  );
};

export default SearchComponent;
