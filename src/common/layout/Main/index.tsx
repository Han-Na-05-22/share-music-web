import { MainProps } from "./interface";
import { MainContainer } from "./style";
import { auth, firestore } from "service/firebase";
import { useRecoilState } from "recoil";
import { userInfo } from "components/Login/state";
import Login from "components/Login";
import { useEffect } from "react";
import Box from "components/Box";
import Button from "components/Button";
const Main = ({ children, className }: MainProps) => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  console.log("useruser", user);
  return (
    <MainContainer className={className}>
      {user?.email ? (
        <div className="my-content left">
          <Box>
            {user?.email}
            <Button
              marginLeft="15px"
              btnType="submit"
              onClick={() => {
                auth?.signOut();
                window?.location?.reload();
              }}
            >
              로그아웃
            </Button>
          </Box>
          <Box width="400px" height="300px">
            내 음악 듣기
          </Box>
        </div>
      ) : (
        <div className="login-content left">
          <Box>
            <Login></Login>
            <Box width="400px" height="300px">
              로그인 후 이용해 주시기 바랍니다.
            </Box>
          </Box>
        </div>
      )}
      {children}
    </MainContainer>
  );
};

export default Main;
