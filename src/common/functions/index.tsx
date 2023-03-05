import { async } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  ref,
  getMetadata,
} from "firebase/storage";
import { firestore, storage } from "service/firebase";

// 음악 추가 시  데이터베이스에 해당 음원 정보 저장
export const sendMusicDataFunction = async (email: string, data: any) => {
  const washingtonRef = doc(firestore, "music", email);

  await setDoc(washingtonRef, {
    musicList: [
      {
        type: "add",

        title: data?.title,
        singer: data?.singer,
        explanation: data?.explanation,
        img: data?.img,
        date: data?.date,
        // id: data?.id,
        // likeCount: data?.likeCount,
        // downloadCount: data?.downloadCount,
      },
    ],
  });

  console.log("음원 등록 완료");
};

export const addMusicFunction = (
  file: any,
  src: any,
  data: {
    title: string;
    singer: string;
    explanation: string;
    img: string;
  },
  setData?: any
) => {
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
      title: `${data?.title}`,
      singer: `${data?.singer}`,
      explanation: `${data?.explanation}`,
      img: `${data?.img}`,
    },
  };

  const storageRef = sRef(storage, `${src}/` + newName + uniqueKey);

  const UploadTask = uploadBytesResumable(storageRef, file, metaData);

  UploadTask.on(
    "state_changed",
    async (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      await console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      alert(`error: image upload error ${JSON.stringify(error)}`);
    },
    async () => {
      await getDownloadURL(UploadTask.snapshot.ref).then((downloadUrl) => {
        console.log(`완료 url: ${downloadUrl}`);

        myMusicListFunction(src, setData);
      });
    }
  );
};

export const myMusicListFunction = (src: any, setData?: any) => {
  if (!src) {
    return;
  }
  const MusicListRef = sRef(storage, `${src}/`);
  console.log("src", src);
  let array: any = "";

  listAll(MusicListRef)
    .then((res) => {
      res?.items?.forEach((item: any) => {
        getDownloadURL(item)?.then((url) => {
          console.log("attay", array);
          console.log("url", url);
          console.log("item", item);
          const forestRef = ref(storage, `${item?._location?.path_}`);
          getMetadata(forestRef)
            .then((metadata) => {
              console.log("metadata", metadata);
              array = [
                ...array,
                { url: url, path: item?._location?.path_, meta: metadata },
              ];
              return setData(array);
            })
            .catch((error) => {
              console.log("err", error);
            });
        });
      });
    })
    .catch((error) => {
      console.log("err", error);
    });

  return setData;
};
