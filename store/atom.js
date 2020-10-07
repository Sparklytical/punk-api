import { atom } from "recoil";

export const beerDataState = atom({
  key: "beer",
  default: [],
});

export const favBeers = atom({
  key: "fav",
  default: [],
});
