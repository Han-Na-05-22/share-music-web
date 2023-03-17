import { atom } from "recoil";

export const myMusicAddState = atom({
  key: "myMusicAddStateData",
  default: false,
});

export const musicListState = atom({
  key: "musicListStateData",
  default: [],
});

export const checkEditMusicState = atom({
  key: "checkEditMusicStateData",
  default: "",
});
