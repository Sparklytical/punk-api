import { atom } from "recoil";

export const beerDataState = atom({
  key: "beer",
  default: {
    data: null,
    loading: true,
  },
});

export const favBeers = atom({
  key: "fav",
  default: [],
});
