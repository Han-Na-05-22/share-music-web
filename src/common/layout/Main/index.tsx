import { MainProps } from "./interface";
import { MainContainer } from "./style";
import { auth, firestore } from "service/firebase";
import { useRecoilState } from "recoil";
import { userInfo } from "components/Login/state";
import Login from "components/Login";
const Main = ({ children, className }: MainProps) => {
  console.log("auth", auth?.currentUser);

  const [user, setUser] = useRecoilState<any>(userInfo);
  console.log("user", user);
  return (
    <MainContainer className={className}>
      {auth?.currentUser ? user?.email : <Login></Login>}
      {children}
    </MainContainer>
  );
};

export default Main;
