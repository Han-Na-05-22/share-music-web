import { atom } from "recoil";

export const userInfo = atom({
  key: "userInfoData",
  default: {},
});

export const loginState = atom({
  key: "loginStateData ",
  default: {
    isLogin: false,
    isJoin: false,
  },
});
