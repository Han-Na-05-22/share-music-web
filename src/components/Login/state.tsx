import { atom } from "recoil";
import { LoginStateProps, UserProps } from "./interface";

export const userInfo = atom<UserProps>({
  key: "userInfoData",
  default: {
    creationTime: "",
    displayName: "",
    email: "",
    name: "",
    phoneNumber: "",
    photoURL: "",
  },
});

export const loginState = atom<LoginStateProps>({
  key: "loginStateData ",
  default: {
    isLogin: false,
    isJoin: false,
  },
});
