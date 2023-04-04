import { MusicFormProps } from "components/AddMusic/interface";
import { atom } from "recoil";

export const selectFilterState = atom({
  key: "selectFilterStateData",
  default:
    "Popular" ||
    "New" ||
    "POP" ||
    "OST" ||
    "발라드" ||
    "댄스" ||
    "클래식" ||
    "랩/힙합" ||
    "R&B" ||
    "트로트" ||
    "락/메탈",
});

export const filterMusicListState = atom<MusicFormProps[]>({
  key: "filterMusicListStateData",
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
