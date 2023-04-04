import { MusicFormProps } from "components/AddMusic/interface";
import { atom } from "recoil";

export const musicLikeCountToptenState = atom<MusicFormProps[]>({
  key: "musicLikeCountToptenStateData",
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

export const musicNewDataListState = atom<MusicFormProps[]>({
  key: "musicNewDataListStateData",
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

export const artistLikeCountToptenState = atom({
  key: "artistLikeCountToptenStateData",
  default: [],
});

export const artistDownloadCountToptenState = atom({
  key: "artistDownloadCountToptenStateData",
  default: [],
});
