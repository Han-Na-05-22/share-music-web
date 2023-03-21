import Button from "components/Button";
import Overlay from "components/Overlay";
import ProfileImg from "components/ProfileImg";
import Textarea from "components/Textarea";
import TextInput from "components/TextInput";
import * as functions from "../../common/functions";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  AddMusicFormProps,
  AddMusicProps,
  addMusicDatabaseProps,
} from "./interface";
import {
  addMusicStorageRefData,
  checkEditMusicState,
  musicListState,
  myMusicAddState,
} from "./state";
import { AddMusicContainer } from "./style";
import { userInfo } from "components/Login/state";
import Loading from "components/Loading";
import BasicSelect from "components/BasicSelect";
import { GenreList } from "utility/data";
import moment from "moment";
import "moment/locale/ko";
import { currentMusicState } from "components/Record/state";
import imageCompression from "browser-image-compression";
import { useMutation } from "react-query";
import axios from "axios";
import { FirebaseStorage } from "firebase/storage";

const AddMusic = ({
  className,
  width = "1150px",
  height = "780px",
}: AddMusicProps) => {
  const [musicDataRef, setMusicDataRef] = useRecoilState<any>(
    addMusicStorageRefData
  );
  console.log("musicDataRef", musicDataRef);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [currentMusic, setCurrentMusic] =
    useRecoilState<any>(currentMusicState);
  const [isEdit, setIsEdit] = useRecoilState<string>(checkEditMusicState);
  const [form, setForm] = useState<AddMusicFormProps>({
    img: "",
    mp3: "",
    title: "",
    genre: "POP",
    singer: "",
    explanation: "",
    mpName: "",
    uniqueKey: new Date()?.getTime(),
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  const [user, setUser] = useRecoilState<any>(userInfo);
  const [isAddMusic, setIsAddMuisc] = useRecoilState<boolean>(myMusicAddState);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<string>("none");

  const handleChangeSelect = (event: any) => {
    const { name } = event.target;
    const isSelected = event.target.options[event.target.selectedIndex].value;

    if (isEdit !== "edit") {
      setForm({ ...form, [name]: isSelected });
    }

    if (isEdit === "edit") {
      setCurrentMusic({
        ...currentMusic,
        [name]: isSelected,
      });
    }
  };

  const handleChangeInput = (event: any) => {
    const { name } = event.target;

    if (isEdit !== "edit") {
      setForm({
        ...form,
        [name]: event.target.value,
      });
    }

    if (isEdit === "edit") {
      setCurrentMusic({
        ...currentMusic,
        [name]: event.target.value,
      });
    }
  };

  const handleChangeMusicImg = (event: any) => {
    const { name } = event.target;
    const formData = new FormData();
    const fr = new FileReader();
    const file = event.target.files[0];

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 100,
    };

    if (file) {
      fr.readAsDataURL(file);

      fr.onload = async () => {
        if (typeof fr.result === "string") {
          formData.append("file", file);

          if (name === "mp3") {
            return setForm({
              ...form,
              [name]: fr.result,
              mpName: file?.name,
              formData: file,
            });
          }

          if (name === "img") {
            try {
              const compressedFile = await imageCompression(file, options);

              const promise =
                imageCompression?.getDataUrlFromFile(compressedFile);
              promise?.then((result: any) => {
                setMusicDataRef(
                  functions?.storageRef(
                    file,
                    `music/${user?.email}`,
                    form?.uniqueKey
                  )
                );
                setForm({
                  ...form,
                  img: result,
                });
              });
            } catch (error) {
              console.log(error);
            }
          }
        }
      };
    }
  };

  const deleteImg = () => {
    setForm({
      ...form,
      img: "",
    });
  };

  const addMusicData = async (
    addMusicDataProps: addMusicDatabaseProps
  ): Promise<any> => {
    const { data } = await axios.post<addMusicDatabaseProps>(
      `${musicDataRef}`,
      functions?.addMusicFunction(
        addMusicDataProps?.file,
        addMusicDataProps?.src,
        addMusicDataProps?.data,
        addMusicDataProps?.setIsCompleted,
        addMusicDataProps?.form,
        addMusicDataProps?.musicList,
        addMusicDataProps?.isClicked
      )
    );

    return data;
  };

  const { mutate, isLoading, isError, error, isSuccess } =
    useMutation(addMusicData);
  console.log("isLoading", isLoading);
  console.log("isError", isError);
  console.log("isSuccess", isSuccess);
  console.log("error", error);
  useEffect(() => {
    if (isCompleted === "done") {
      setIsAddMuisc(false);
      setForm({
        img: "",
        mp3: "",
        title: "",
        singer: "",
        explanation: "",
        genre: "",
        mpName: "",
        uniqueKey: new Date()?.getTime(),
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
    }
  }, [isCompleted]);

  return (
    <Overlay>
      <AddMusicContainer className={className} height={height} width={width}>
        <div className="music-infos">
          <div className="music-img musics">
            {isEdit !== "edit" ? (
              <ProfileImg
                name="img"
                file={form?.img}
                isError={isClicked && form?.img?.length === 0}
                errMsg={"이미지를 등록해 주세요."}
                onChange={(e) => {
                  handleChangeMusicImg(e);
                }}
                onClickDelete={deleteImg}
              />
            ) : (
              <img src={currentMusic?.img} alt="" />
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
                  ✴︎ mp3 파일만 등록 가능합니다.
                </strong>
                <TextInput
                  width="150px"
                  name="mp3"
                  accept="audio/mp3"
                  type="file"
                  className="add-mp3-input"
                  value={undefined}
                  label="음원등록"
                  onChange={(e) => handleChangeMusicImg(e)}
                ></TextInput>
              </>
            ) : (
              <p className="music-name">음원 : {currentMusic?.mp3}</p>
            )}

            <BasicSelect
              selectData={GenreList}
              name="genre"
              value={isEdit === "edit" ? currentMusic?.genre : form?.genre}
              onChange={handleChangeSelect}
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
              onChange={(e) => {
                handleChangeInput(e);
              }}
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
              onChange={(e) => {
                handleChangeInput(e);
              }}
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
              onChange={(e) => {
                handleChangeInput(e);
              }}
            ></Textarea>
          </div>
          <div className="btn-container">
            <Button
              btnType="cancel"
              onClick={() => {
                setIsAddMuisc(false);
                setIsEdit("");
              }}
            >
              취소
            </Button>
            <Button
              marginLeft="15px"
              btnType={
                isEdit === "edit" ||
                (form?.img?.length !== 0 &&
                  form?.mp3?.length !== 0 &&
                  form?.title?.length !== 0 &&
                  form?.singer?.length !== 0 &&
                  form?.explanation?.length !== 0 &&
                  form?.mpName?.length !== 0)
                  ? "submit"
                  : "none"
              }
              onClick={async () => {
                if (isEdit === "edit") {
                  await functions.sendUpdateLikeDownloadCountFunction(
                    musicList
                      ?.filter((i: any) => i?.id !== currentMusic?.id)
                      ?.concat(currentMusic)
                  );
                  alert("수정이 완료되었습니다.");
                  setIsEdit("");
                  functions.getMusicListDataFunction(setMusicList);
                } else {
                  mutate({
                    file: form?.formData,
                    src: `music/${user?.email}`,
                    data: {
                      genre: form?.genre,
                      title: form?.title,
                      singer: form?.singer,
                      explanation: form?.explanation,
                      img: form?.img,
                      uniqueKey: form?.uniqueKey,
                    },
                    setIsCompleted: setIsCompleted,
                    form: form,
                    musicList: musicList,
                    isClicked: setIsClicked,
                  });
                }
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
function sRef(storage: FirebaseStorage, arg1: string) {
  throw new Error("Function not implemented.");
}
