import { async } from "@firebase/util";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  ref,
  getMetadata,
} from "firebase/storage";
import { firestore, storage } from "service/firebase";

// 데이터베이스에 저장된 음원리스트들을 불러오기 위한 함수
export const getMusicListDataFunction = async (setMusicListData: any) => {
  const querySnapshot = await getDocs(collection(firestore, "music"));
  let array: any = "";
  querySnapshot?.forEach((doc: any) => {
    array = doc?.data()?.data;
    return setMusicListData(array);
  });
};

// 음악 추가 시  데이터베이스에 해당 음원 정보 저장
export const sendMusicDataFunction = async (
  email: string,
  data: any,
  musicListData: any
) => {
  const washingtonRef = doc(firestore, "music", "musicList");
  console.log("musicListData?.length", musicListData?.length);

  console.log("why?", musicListData?.length === 0);

  if (musicListData?.length === 0) {
    console.log("아무 값이 없음");
    await setDoc(washingtonRef, {
      data: [
        {
          id: 1,
          type: "add",
          email: email,
          title: data?.title,
          singer: data?.singer,
          explanation: data?.explanation,
          img: data?.img,
          date: data?.date,
          mp3: data?.formData?.name
            .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
            .split(" ")
            .join(""),
          // likeCount: data?.likeCount,
          // downloadCount: data?.downloadCount,
        },
      ],
    });
  } else {
    console.log("배열안에 데이터 값이 있음");

    await updateDoc(washingtonRef, {
      data: arrayUnion({
        id: musicListData?.length + 1,
        type: "add",
        email: email,
        title: data?.title,
        singer: data?.singer,
        explanation: data?.explanation,
        img: data?.img,
        date: data?.date,
        mp3: data?.formData?.name
          .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
          .split(" ")
          .join(""),
        // likeCount: data?.likeCount,
        // downloadCount: data?.downloadCount,
      }),
    });
  }

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

  const storageRef = sRef(storage, `${src}/` + newName);

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
