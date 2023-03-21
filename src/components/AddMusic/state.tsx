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

export const addMusicStorageRefData = atom({
  key: "addMusicStorageRefDataState",
  default: "",
});
