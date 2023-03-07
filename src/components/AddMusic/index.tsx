import Button from "components/Button";
import Overlay from "components/Overlay";
import ProfileImg from "components/ProfileImg";
import Textarea from "components/Textarea";
import TextInput from "components/TextInput";
import * as functions from "../../common/functions";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { auth } from "service/firebase";
import { AddMusicFormProps, AddMusicProps } from "./interface";
import { musicListState, myMusic, myMusicAddState } from "./state";
import { AddMusicContainer } from "./style";
import { userInfo } from "components/Login/state";
import Loading from "components/Loading";
import BasicSelect from "components/BasicSelect";
import { GenreList } from "utility/data";
import moment from "moment";
import "moment/locale/ko";
const AddMusic = ({
  className,
  width = "1150px",
  height = "780px",
}: AddMusicProps) => {
  const [myMusicList, setMyMusicList] = useRecoilState<any>(myMusic);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);

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

  const [isCompleted, setIsCompleted] = useState<string>("none");

  const handleChangeSelect = (event: any) => {
    const { name } = event.target;
    const isSelected = event.target.options[event.target.selectedIndex].value;
    setForm({ ...form, [name]: isSelected });
  };

  const handleChangeImg = (event: any) => {
    const { name } = event.target;
    const formData = new FormData();
    const fr = new FileReader();
    const file = event.target.files[0];

    if (file) {
      fr.readAsDataURL(file);

      fr.onload = () => {
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
          return setForm({ ...form, [name]: fr.result });
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

  // todo : 합칠 것
  const getUserId = auth?.currentUser?.uid.replace('"', "");

  const addMusicData = async () => {
    try {
      await functions?.addMusicFunction(
        form.formData,
        `music/${user?.email}`,
        {
          genre: form?.genre,
          title: form?.title,
          singer: form?.singer,
          explanation: form?.explanation,
          img: form?.img,
          uniqueKey: form?.uniqueKey,
        },
        setMyMusicList,
        setIsCompleted,
        setMusicList
      );

      functions?.sendMusicDataFunction(user?.email, form, musicList);
    } catch (err) {
      console.log("err", err);
    }

    setMyMusicList(functions?.myMusicListFunction);
  };

  useEffect(() => {
    if (isCompleted === "done") {
      setIsAddMuisc(false);
      setForm({
        img: "",
        mp3: "",
        title: "",
        singer: "",
        explanation: "",
        genre: "POP",
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
            <ProfileImg
              name="img"
              file={form.img}
              isError={form?.img?.length === 0}
              errMsg={"이미지를 등록해 주세요."}
              onChange={handleChangeImg}
              onClickDelete={deleteImg}
            />
          </div>

          <div className="music-mp3 musics">
            <p
              className={
                form?.mp3?.length === 0 ? "mp3-error mp3s" : "mp3-name mp3s"
              }
            >
              {form?.mp3?.length === 0
                ? "음원을 업로드 해주세요"
                : form?.mpName}
            </p>
            <TextInput
              width="150px"
              name="mp3"
              accept="audio/*"
              type="file"
              className="add-mp3-input"
              value={undefined}
              label="음원등록"
              onChange={handleChangeImg}
            ></TextInput>
            <BasicSelect
              selectData={GenreList}
              name="genre"
              onChange={handleChangeSelect}
            ></BasicSelect>
          </div>
          <div className="music-title-singer musics">
            <TextInput
              width="450px"
              name="title"
              value={form?.title}
              label="제목"
              isError={form?.title?.length === 0}
              errorMsg={"제목을 입력해주세요."}
              onChange={(e) => {
                setForm({
                  ...form,
                  title: e.target.value,
                });
              }}
            ></TextInput>
            <TextInput
              width="300px"
              name="singer"
              value={form?.singer}
              label="가수"
              isError={form?.singer?.length === 0}
              errorMsg={"가수명을 입력해주세요."}
              onChange={(e) => {
                setForm({
                  ...form,
                  singer: e.target.value,
                });
              }}
            ></TextInput>
          </div>
          <div className="music-explan musics">
            <Textarea
              label="설명"
              name="explanation"
              isError={form?.explanation?.length === 0}
              errorMsg={"설명글을 입력해주세요."}
              value={form?.explanation}
              onChange={(e) => {
                setForm({
                  ...form,
                  explanation: e.target.value,
                });
              }}
            ></Textarea>
          </div>
          <div className="btn-container">
            <Button
              btnType="cancel"
              onClick={() => {
                setIsAddMuisc(false);
              }}
            >
              취소
            </Button>
            <Button
              marginLeft="15px"
              btnType={
                form?.img?.length !== 0 &&
                form?.mp3?.length !== 0 &&
                form?.title?.length !== 0 &&
                form?.singer?.length !== 0 &&
                form?.explanation?.length !== 0 &&
                form?.mpName?.length !== 0
                  ? "submit"
                  : "none"
              }
              onClick={async () => {
                await functions.getMusicListDataFunction(setMusicList);
                addMusicData();
              }}
            >
              확인
            </Button>
          </div>
        </div>
        {isCompleted === "loading" && <Loading></Loading>}
      </AddMusicContainer>
    </Overlay>
  );
};

export default AddMusic;
