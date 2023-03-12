import { atom } from "recoil";

export const selectFilterState = atom({
  key: "selectFilterStateData",
  default:
    "TOP" ||
    "NEW" ||
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
