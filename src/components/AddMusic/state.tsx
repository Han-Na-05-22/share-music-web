import { atom } from "recoil";
import { MusicFormProps } from "./interface";

export const myMusicAddState = atom({
  key: "myMusicAddStateData",
  default: false,
});

export const musicListState = atom<MusicFormProps[]>({
  key: "musicListStateData",
  default: [
    {
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
  ],
});

export const checkEditMusicState = atom({
  key: "checkEditMusicStateData",
  default: "",
});

export const addMusicStorageRefData = atom({
  key: "addMusicStorageRefDataState",
  default: "",
});
