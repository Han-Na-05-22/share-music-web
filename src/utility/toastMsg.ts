import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type toastMsgOptions = "add" | "update" | "delete" | "login" | "join";

type toastResultState = "success" | "failure";

export const toastMsg = (
  options: toastMsgOptions,
  resultState: toastResultState,
) => {
  const msgContent = {
    add: "추가에",
    update: "업데이트에",
    delete: "삭제에",
    login: "로그인에",
    join: "회원가입에",
  };
  if (resultState === "success") {
    return toast?.success(`${msgContent[options]} 성공하였습니다.`, {
      autoClose: 3000,
    });
  } else {
    return toast?.error(`${msgContent[options]} 실패하였습니다.`, {
      autoClose: 3000,
    });
  }
};
