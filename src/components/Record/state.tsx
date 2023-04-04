import { editMusicFormProps } from "components/AddMusic/interface";
import { atom } from "recoil";

export const currentMusicState = atom<editMusicFormProps>({
  key: "currentMusicStateData",
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
