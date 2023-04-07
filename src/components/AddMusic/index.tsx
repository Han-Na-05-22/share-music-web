import Button from "components/Button";
import Overlay from "components/Overlay";
import ProfileImg from "components/ProfileImg";
import Textarea from "components/Textarea";
import TextInput from "components/TextInput";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AddMusicProps, MusicFormProps } from "./interface";
import { checkEditMusicState, musicListState, myMusicAddState } from "./state";
import { AddMusicContainer } from "./style";
import { userInfo } from "components/Login/state";
import Loading from "components/Loading";
import BasicSelect from "components/BasicSelect";
import { GenreList } from "utility/data";
import { currentMusicState } from "components/Record/state";
import { useMutation, useQueryClient } from "react-query";
import { musicApi } from "common/api/music";
import { isMusicDetailState } from "components/MusicDetail/state";
import { UserProps } from "components/Login/interface";
import { MusicDetailStateProps } from "components/MusicDetail/interface";
import { userFunction } from "common/api/user";
import useInputs from "hooks/useInputs";

export interface addMusicDatabaseProps {
  file: any;
  src: string;
  data: {
    genre: string;
    title: string;
    singer: string;
    explanation: string;
    uniqueKey: string;
    img: string;
  };
  setIsCompleted?: any;
  getUrl?: any;
}

const AddMusic = ({
  className,
  width = "1150px",
  height = "780px",
}: AddMusicProps) => {
  const [musicList, setMusicList] =
    useRecoilState<MusicFormProps[]>(musicListState);
  const [currentMusic, setCurrentMusic] =
    useRecoilState<MusicFormProps>(currentMusicState);
  const [isEdit, setIsEdit] = useRecoilState<string>(checkEditMusicState);
  const [user, setUser] = useRecoilState<UserProps>(userInfo);

  const [
    form,
    setForm,
    handleChangeInput,
    handleChangeSelect,
    handleChangeImg,
  ] = useInputs("add");

  const [isAddMusic, setIsAddMuisc] = useRecoilState<boolean>(myMusicAddState);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<string>("none");
  const [isDetailData, setIsDetailData] =
    useRecoilState<MusicDetailStateProps>(isMusicDetailState);

  const queryClient = useQueryClient();

  const isRegex =
    form?.img !== "" &&
    form?.mp3 !== "" &&
    form?.title !== "" &&
    form?.singer !== "" &&
    form?.explanation !== "" &&
    form?.mpName !== "";

  const { mutate: addStorageMusic } = useMutation(
    () =>
      musicApi?.addStorageMusicData(
        `music/${user?.email}`,
        form,
        setIsCompleted,
        musicApi?.sendMusicData,
        musicList,
      ),

    {
      onError: (error) => {
        console.log("error : ", error);
        setIsClicked(true);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries("getMusicAllDataList");
        setIsClicked(false);

        setTimeout(function () {
          console.log("실행됨!");
          queryClient.invalidateQueries("getMusicAllDataList");
        }, 10000);
      },
    },
  );

  const { mutate: updateMusicData } = useMutation(
    () =>
      musicApi?.updateMusicDataList(
        musicList
          ?.filter((i: any) => i?.id !== currentMusic?.id)
          ?.concat(currentMusic),
      ),
    {
      onError: (error) => {
        console.log("error:", error);
        alert("수정에 실패하였습니다.");
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries("getMusicAllDataList");
        setIsEdit("");
        setIsDetailData({
          ...isDetailData,
          isDetail: false,
        });
        alert("수정이 완료되었습니다.");
      },
    },
  );

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (isEdit === "edit") {
      updateMusicData();
    }

    if (isEdit !== "edit" && isRegex) {
      addStorageMusic();
    } else {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (isCompleted === "done") {
      setIsAddMuisc(false);
      // setForm({
      //   img: "",
      //   mp3: "",
      //   title: "",
      //   singer: "",
      //   explanation: "",
      //   genre: "",
      //   displayName: "",
      //   mpName: "",
      //   uniqueKey: new Date()?.getTime(),
      //   date: moment().format("YYYY-MM-DD HH:mm:ss"),
      // });
    }
  }, [isCompleted]);

  return (
    <Overlay>
      <AddMusicContainer className={className} height={height} width={width}>
        <div className={isEdit !== "edit" ? "music-infos" : "music-infos edit"}>
          <div className="music-img musics">
            {isEdit !== "edit" ? (
              <ProfileImg
                name="img"
                file={form?.img}
                isError={isClicked && form?.img?.length === 0}
                errMsg={"이미지를 등록해 주세요."}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeImg(e);
                }}
                onClickDelete={() => userFunction?.deleteImg(setForm, "img")}
              />
            ) : (
              <img src={currentMusic?.img} alt="내가 클릭한 음원 이미지" />
            )}
          </div>

          <div className="music-mp3 musics">
            {isEdit !== "edit" ? (
              <>
                <p
                  className={
                    isClicked && form?.mp3?.length === 0
                      ? "mp3-error mp3s"
                      : "mp3-name mp3s"
                  }
                >
                  {form?.mp3?.length === 0
                    ? "음원을 업로드 해주세요"
                    : form?.mpName}
                </p>
                <strong className="add-info">
                  mp3 파일만 등록 가능합니다.
                </strong>
                <TextInput
                  width="150px"
                  name="mp3"
                  accept="audio/mp3"
                  type="file"
                  className="add-mp3-input"
                  value={undefined}
                  label="음원등록"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeImg(e, isEdit)
                  }
                ></TextInput>
              </>
            ) : (
              <p className="music-name">음원 : {currentMusic?.mp3}</p>
            )}

            <BasicSelect
              selectData={GenreList}
              name="genre"
              value={isEdit === "edit" ? currentMusic?.genre : form?.genre}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleChangeSelect(e, isEdit)
              }
            ></BasicSelect>
          </div>
          <div className="music-title-singer musics">
            <TextInput
              width="450px"
              name="title"
              value={isEdit !== "edit" ? form?.title : currentMusic?.title}
              label="제목"
              isError={
                isClicked && isEdit !== "edit" && form?.title?.length === 0
              }
              errorMsg={"제목을 입력해주세요."}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(e, isEdit)
              }
            ></TextInput>
            <TextInput
              width="300px"
              name="singer"
              value={isEdit !== "edit" ? form?.singer : currentMusic?.singer}
              label="가수"
              isError={
                isClicked && isEdit !== "edit" && form?.singer?.length === 0
              }
              errorMsg={"가수명을 입력해주세요."}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(e, isEdit)
              }
            ></TextInput>
          </div>
          <div className="music-explan musics">
            <Textarea
              label="설명"
              name="explanation"
              isError={
                isClicked &&
                isEdit !== "edit" &&
                form?.explanation?.length === 0
              }
              errorMsg={"설명글을 입력해주세요."}
              value={
                isEdit !== "edit"
                  ? form?.explanation
                  : currentMusic?.explanation
              }
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                handleChangeInput(e, isEdit);
              }}
            ></Textarea>
          </div>
          <div className="btn-container">
            <Button
              btnType="cancel"
              onClick={() => {
                setIsAddMuisc(false);
                setIsEdit("");
                setIsDetailData({
                  isDetail: false,
                  isLocation: "",
                });
              }}
            >
              취소
            </Button>
            <Button
              marginLeft="15px"
              btnType={isEdit === "edit" || isRegex ? "submit" : "none"}
              onClick={(e: any) => {
                handleSubmit(e);
              }}
            >
              {isEdit === "edit" ? "수정" : "등록"}
            </Button>
          </div>
        </div>
        {isCompleted === "loading" && <Loading></Loading>}
      </AddMusicContainer>
    </Overlay>
  );
};

export default AddMusic;
