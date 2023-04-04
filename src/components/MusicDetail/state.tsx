import { MusicFormProps } from "components/AddMusic/interface";
import { atom } from "recoil";
import { MusicDetailStateProps } from "./interface";

export const musicDetailState = atom<MusicFormProps>({
  key: "musicDetailStateData",
  default: {
    date: "",
    displayName: "",
    downloadClickList: [],
    downloadCount: 0,
    email: "",
    explanation: "",
    genre: "",
    id: 0,
    img: "",
    likeCount: 0,
    likedClickList: [],
    mp3: "",
    singer: "",
    title: "",
    url: "",
  },
});

export const isMusicDetailState = atom<MusicDetailStateProps>({
  key: "isMusicDetailStateData",
  default: {
    isDetail: false,
    isLocation: "",
  },
});
