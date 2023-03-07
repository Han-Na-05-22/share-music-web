import { atom } from "recoil";

export const myMusic = atom({
  key: "myMusicData",
  default: [],
});

export const myMusicAddState = atom({
  key: "myMusicAddStateData",
  default: false,
});

export const musicListState = atom({
  key: "musicListStateData",
  default: [],
});
