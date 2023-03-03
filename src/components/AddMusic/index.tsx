import Button from "components/Button";
import Overlay from "components/Overlay";
import ProfileImg from "components/ProfileImg";
import Textarea from "components/Textarea";
import TextInput from "components/TextInput";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { auth, firestore, storage } from "service/firebase";
import { getDownloadURL } from "firebase/storage";
import { AddMusicFormProps, AddMusicProps } from "./interface";
import { myMusic } from "./state";
import { AddMusicContainer } from "./style";
import { userInfo } from "components/Login/state";
import { ref as sRef, uploadBytesResumable } from "firebase/storage";

const AddMusic = ({
  children,
  className,
  width = "1150px",
  height = "780px",
}: AddMusicProps) => {
  const [form, setForm] = useState<AddMusicFormProps>({
    img: "",
    mp3: "",
    title: "",
    singer: "",
    explanation: "",
    mpName: "",
  });
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [music, setMusic] = useRecoilState<any>(myMusic);

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

  // todo : 공통으로 사용
  const saveImgFunction = (file: any, src: any) => {
    const uniqueKey = new Date()?.getTime();

    if (!file) {
      return;
    }

    const newName = file.name
      .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
      .split(" ")
      .join("");

    const metaData = {
      contentType: file.type,
      customMetadata: {
        mpName: `${file?.name}`,
        title: `${form?.title}`,
        singer: `${form?.singer}`,
        explanation: `${form?.explanation}`,
        img: `${form?.img}`,
      },
    };

    const storageRef = sRef(storage, `${src}/` + newName + uniqueKey);

    const UploadTask = uploadBytesResumable(storageRef, file, metaData);

    UploadTask.on(
      "state_changed",
      async (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        await console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        alert(`error: image upload error ${JSON.stringify(error)}`);
      },
      async () => {
        await getDownloadURL(UploadTask.snapshot.ref).then((downloadUrl) => {
          console.log(`완료 url: ${downloadUrl}`);
        });
      }
    );
  };

  const addMusicData = async (e: any) => {
    try {
      saveImgFunction(form.formData, `music/${user?.email}`);

      setForm({
        img: "",
        mp3: "",
        title: "",
        singer: "",
        explanation: "",
        mpName: "",
        formData: "",
      });

      await alert("음원 등록이 완료되었습니다.");

      //
    } catch (err) {
      console.log("err", err);
      alert("음원 등록에 실패하였습니다.");
    }
  };

  return (
    <Overlay>
      <AddMusicContainer className={className} height={height} width={width}>
        {children}
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
              value={undefined}
              label="음원등록"
              onChange={handleChangeImg}
            ></TextInput>
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
            <Button btnType="cancel" onClick={() => {}}>
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
              onClick={(e) => addMusicData(e)}
            >
              확인
            </Button>
          </div>
        </div>
      </AddMusicContainer>
    </Overlay>
  );
};

export default AddMusic;
