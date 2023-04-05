import { atom } from "recoil";
import { NavProps } from "./interface";

export const navState = atom({
  key: "navStateData",
  default: [
    {
      name: "Home",
      nav: "/",
      isClicked: true,
    },
    {
      name: "New",
      nav: "/musicTable",
      isClicked: false,
    },
    {
      name: "Popular",
      nav: "/musicTable",
      isClicked: false,
    },
    {
      name: "MyMusic",
      nav: "/musicTable",
      isClicked: false,
    },
    {
      name: "Playlist",
      nav: "/musicTable",
      isClicked: false,
    },
  ],
});
