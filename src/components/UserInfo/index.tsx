import Button from "components/Button";
import { userInfo } from "components/Login/state";
import ProfileImg from "components/ProfileImg";
import TextInput from "components/TextInput";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { auth } from "service/firebase";
import { UserInfoProps } from "./interface";
import { SimplePrpfileContainer, UserInfoContainer } from "./style";
import { useMutation, useQueryClient } from "react-query";
import { userApi } from "common/api/user";
import { isMusicDetailState } from "components/MusicDetail/state";
import SVG from "react-inlinesvg";
import {
  artistDownloadCountToptenState,
  artistLikeCountToptenState,
} from "pages/Home/state";
import { musicListState } from "components/AddMusic/state";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserInfo = ({ className }: UserInfoProps) => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const iconMyMusic = faRecordVinyl as IconProp;
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [form, setForm] = useState<any>({
    photoURL: user?.photoURL,
    name: user?.name,
    pwd: "",
    rePwd: "",
    phoneNumber: user?.phoneNumber,
    displayName: user?.displayName,
  });
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const getUserId = auth?.currentUser?.uid.replace('"', "");
  const [artistLikeCountTopten, setArtistLikeCountTopten] = useRecoilState<any>(
    artistLikeCountToptenState
  );

  const [artistDownloadCountTopten, setArtistDownloadCountTopten] =
    useRecoilState<any>(artistDownloadCountToptenState);
  const queryClient = useQueryClient();

  const { mutate: editUser } = useMutation(
    () => userApi?.editUserData(getUserId, form, user),
    {
      onError: (error) => {
        console.log("error : ", error);
        alert("수정에 실패하였습니다.");
      },
      onSuccess: () => {
        queryClient.invalidateQueries("getUserAllList");
        alert("수정이 완료되었습니다.");
      },
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    editUser();
  };

  const handleChangeImg = (event: any) => {
    const formData = new FormData();
    const fr = new FileReader();
    const file = event.target.files[0];

    if (file) {
      fr.readAsDataURL(file);

      fr.onload = async () => {
        if (typeof fr.result === "string") {
          formData.append("file", file);
          setForm({ ...form, photoURL: fr.result });
        }
      };
    }
  };

  const deleteImg = () => {
    setForm({
      ...form,
      photoURL: "",
    });
  };

  return (
    <>
      {isDetailData?.isLocation === "mypage" ? (
        <UserInfoContainer className={className}>
          <div className="my-info-edit">
            <div className="my-img mine">
              <ProfileImg
                name="photoURL"
                file={form?.photoURL}
                onChange={(e) => handleChangeImg(e)}
                onClickDelete={deleteImg}
              />
            </div>
            <div className="input-container">
              <TextInput
                width="100%"
                name="name"
                value={form?.name}
                label="이름"
                onChange={(e) => {
                  setForm({
                    ...form,
                    name: e.target.value,
                  });
                }}
              ></TextInput>
              <TextInput
                width="100%"
                name="email"
                value={user?.email?.split("@")[0]}
                label="아이디"
                onChange={(e) => {}}
              ></TextInput>
              <TextInput
                name="phoneNumber"
                type="text"
                width="100%"
                value={form?.phoneNumber}
                label="휴대폰"
                onChange={(e) => {
                  setForm({
                    ...form,
                    phoneNumber: e.target.value,
                  });
                }}
              ></TextInput>

              <TextInput
                name="displayName"
                width="100%"
                type="text"
                value={form?.displayName}
                label="닉네임"
                onChange={(e) => {
                  setForm({
                    ...form,
                    displayName: e.target.value,
                  });
                }}
              ></TextInput>
            </div>

            <Button
              className="my-info-submit"
              btnType="submit"
              onClick={(e: any) => {
                handleSubmit(e);
                // usersListData?.find((item: any) => item?.email === form?.email)
                //   ?.displayName === form?.displayName
                //   ? alert("이미 사용중인 닉네임 입니다.")
                //   : handleSubmit(e);
              }}
            >
              수정
            </Button>
          </div>
        </UserInfoContainer>
      ) : (
        <SimplePrpfileContainer>
          <div className="auth-profile">
            <img src={user?.photoURL} alt="" />
            <span>{user?.displayName} </span>
          </div>
          <div className="my-counts">
            <div className="heart-count count">
              <SVG src="/svg/heart.svg" />
              <span>
                {musicList?.filter((item: any) => item?.email === user?.email)
                  ?.length !== 0 &&
                musicList?.filter((item: any) => item?.email === user?.email)
                  ?.length !== undefined
                  ? musicList
                      ?.filter((i: any) => i?.email === user?.email)
                      ?.map((a: any) => a?.likeCount)
                      ?.reduce((sum: number, currValue: number) => {
                        return sum + currValue;
                      })
                  : "0"}
              </span>
            </div>
            <div className="download-count count">
              <SVG src="/svg/download.svg" />
              <span>
                {musicList?.filter((item: any) => item?.email === user?.email)
                  ?.length !== 0 &&
                musicList?.filter((item: any) => item?.email === user?.email)
                  ?.length !== undefined
                  ? musicList
                      ?.filter((i: any) => i?.email === user?.email)
                      ?.map((a: any) => a?.downloadCount)
                      ?.reduce((sum: number, currValue: number) => {
                        return sum + currValue;
                      })
                  : "0"}
              </span>
            </div>
            <div className="my-registered-count count">
              <FontAwesomeIcon
                icon={iconMyMusic}
                onClick={(e: any) => {
                  e.preventDefault();
                }}
              />
              <span>
                {
                  musicList?.filter((i: any) => i?.email === user?.email)
                    ?.length
                }
              </span>
            </div>
          </div>
        </SimplePrpfileContainer>
      )}
    </>
  );
};

export default UserInfo;
