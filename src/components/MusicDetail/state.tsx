import { atom } from "recoil";

export const musicDetailState = atom({
  key: "musicDetailStateData",
  default: {},
});

export const musicDetailUrlState = atom({
  key: "musicDetailUrlStateData",
  default: "",
});
export const isMusicDetailState = atom({
  key: "isMusicDetailStateData",
  default: {
    isDetail: false,
    isLocation: "",
  },
});
