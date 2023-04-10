import { LoginProps, UserProps } from "./../components/Login/interface";
import {
  AddMusicFormProps,
  MusicFormProps,
} from "components/AddMusic/interface";
import { JoinFormProps } from "components/Join/interface";
import { UserFormProps } from "components/UserInfo/interface";
import React, { useState } from "react";
import moment from "moment";
import { auth } from "service/firebase";
import { userInfo } from "components/Login/state";
import { useRecoilState } from "recoil";
import imageCompression from "browser-image-compression";
import { currentMusicState } from "components/Record/state";

export default function useInputs(type: "add" | "join" | "login" | "user") {
  const [user, setUser] = useRecoilState<UserProps>(userInfo);
  const [currentMusic, setCurrentMusic] =
    useRecoilState<MusicFormProps>(currentMusicState);
  const [form, setForm] = useState<
    AddMusicFormProps | JoinFormProps | LoginProps | UserFormProps | any
  >(
    (type === "add" && {
      img: "",
      mp3: "",
      title: "",
      genre: "POP",
      displayName: auth?.currentUser?.displayName,
      singer: "",
      explanation: "",
      mpName: "",
      uniqueKey: new Date()?.getTime(),
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    }) ||
      (type === "join" && {
        img: "",
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phoneNumber: "",
        displayName: "",
      }) ||
      (type === "login" && {
        email: "",
        password: "",
      }) ||
      (type === "user" && {
        photoURL: user?.photoURL,
        name: user?.name,
        pwd: "",
        rePwd: "",
        phoneNumber: user?.phoneNumber,
        displayName: user?.displayName,
      }) ||
      {},
  );

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    isEdit?: string,
  ) => {
    const { name, value, type } = event?.target;

    if (isEdit === "edit") {
      setCurrentMusic({
        ...currentMusic,
        [name]: event.target.value,
      });
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChangeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    isEdit?: string,
  ) => {
    const { name } = event.target;
    const isSelected = event.target.options[event.target.selectedIndex].value;

    if (isEdit === "edit") {
      setCurrentMusic({
        ...currentMusic,
        [name]: isSelected,
      });
    }

    setForm({ ...form, [name]: isSelected });
  };

  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const { name } = event.target;
    const formData = new FormData();
    const fr = new FileReader();
    const file = event.target.files[0];

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 200,
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
          } else {
            const compressedFile = await imageCompression(file, options);

            const promise =
              imageCompression?.getDataUrlFromFile(compressedFile);
            promise?.then((result: any) => {
              setForm({
                ...form,
                [name]: fr.result,
              });
            });
          }
        }
      };
    }
  };

  return [
    form,
    setForm,
    handleChangeInput,
    handleChangeSelect,
    handleChangeImg,
  ];
}
