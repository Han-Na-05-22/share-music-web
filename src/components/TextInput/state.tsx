import { atom } from "recoil";

export const searchInputState = atom({
  key: "searchInputStateData",
  default: "",
});

export const filterGenreState = atom({
  key: "filterGenreStateData",
  default: "All",
});
