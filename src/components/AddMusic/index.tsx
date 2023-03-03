import Button from "components/Button";
import Overlay from "components/Overlay";
import ProfileImg from "components/ProfileImg";
import Textarea from "components/Textarea";
import TextInput from "components/TextInput";
import Upload from "components/Upload";
import { useState } from "react";
import { AddMusicFormProps, AddMusicProps } from "./interface";
import { AddMusicContainer } from "./style";

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

  const handleChangeImg = (event: any) => {
    const { name } = event.target;
    const formData = new FormData();
    const fr = new FileReader();
    const file = event.target.files[0];
    console.log("formData", formData);
    console.log("file", file);
    console.log("fr", fr);
    if (file) {
      fr.readAsDataURL(file);

      fr.onload = () => {
        if (typeof fr.result === "string") {
          formData.append("file", file);
          setForm({ ...form, [name]: fr.result, mpName: file?.name });
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
  console.log("form", form);
  return (
    <Overlay>
      <AddMusicContainer className={className} height={height} width={width}>
        {children}
        <div className="music-infos">
          <div className="music-img musics">
            <ProfileImg
              name="img"
              file={form.img}
              onChange={handleChangeImg}
              onClickDelete={deleteImg}
            />
          </div>
          <div className="music-mp3 musics">
            <Upload
              name="mp3"
              onChange={handleChangeImg}
              file={form?.mp3}
            ></Upload>
          </div>
          <div className="music-title-singer musics">
            <TextInput
              width="350px"
              name="title"
              value={form?.title}
              label="제목"
              onChange={(e) => {
                setForm({
                  ...form,
                  title: e.target.value,
                });
              }}
            ></TextInput>
            <TextInput
              width="350px"
              name="singer"
              value={form?.singer}
              label="가수"
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
            <Button marginLeft="15px" btnType="submit" onClick={() => {}}>
              확인
            </Button>
          </div>
        </div>
      </AddMusicContainer>
    </Overlay>
  );
};

export default AddMusic;
