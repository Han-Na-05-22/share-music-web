import { async } from "@firebase/util";
import {
  arrayRemove,
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
import moment from "moment";
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

  if (musicListData?.length === 0) {
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
          genre: data?.genre,
          mp3: `${
            data?.formData?.name
              .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
              .split(" ")
              .join("") + data?.uniqueKey
          }`,
          likeCount: 0,
          likedClickList: [{ email: "", updateTiem: "" }],

          downloadCount: 0,
          downloadClickList: [{ email: "", updateTiem: "" }],
        },
      ],
    });
  } else {
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
        genre: data?.genre,
        mp3: `${
          data?.formData?.name
            .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
            .split(" ")
            .join("") + data?.uniqueKey
        }`,
        likeCount: 0,
        likedClickList: [{ email: "", updateTiem: "" }],
        downloadCount: 0,
        downloadClickList: [{ email: "", updateTiem: "" }],
      }),
    });
  }
};

// 좋아요 또는 다운로드 클릭 시 count 및 클릭한 user 정보 DB에 저장하는 함수
// todo : 좋아요만 구현됨. 다운로드 해야함!
export const sendUpdateLikeDownloadCountFunction = async (date: any) => {
  const washingtonRef = doc(firestore, "music", "musicList");

  await updateDoc(washingtonRef, {
    data: arrayRemove(),
  });

  await updateDoc(washingtonRef, { data: date });
};

export const addMusicFunction = (
  file: any,
  src: any,
  data: {
    genre: string;
    title: string;
    singer: string;
    explanation: string;
    uniqueKey: string;
    img: string;
  },
  setData?: any,
  setIsCompleted?: any,
  setMusicList?: any
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
      genre: `${data?.genre}`,
      mpName: `${file?.name}`,
      title: `${data?.title}`,
      singer: `${data?.singer}`,
      explanation: `${data?.explanation}`,
      img: `${data?.img}`,
    },
  };

  const storageRef = sRef(storage, `${src}/` + newName + data?.uniqueKey);

  const UploadTask = uploadBytesResumable(storageRef, file, metaData);

  UploadTask.on(
    "state_changed",
    async (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setIsCompleted("loading");
      await console.log(`Upload is ${progress}% done`);
      if (progress === 100) {
        alert("음원 등록이 완료되었습니다.");
        setIsCompleted("done");
        getMusicListDataFunction(setMusicList);
      }
    },
    (error) => {
      alert("음원 등록에 실패하였습니다.");
      console.log(`error: image upload error ${JSON.stringify(error)}`);
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

  let array: any = "";

  listAll(MusicListRef)
    .then((res) => {
      res?.items?.forEach((item: any) => {
        getDownloadURL(item)?.then((url) => {
          const forestRef = ref(storage, `${item?._location?.path_}`);
          getMetadata(forestRef)
            .then((metadata) => {
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

export const getMusicUrlFunction = (src: any, setData: any, name: any) => {
  if (!src) {
    return;
  }

  const MusicListRef = sRef(storage, `music/${src}/`);

  listAll(MusicListRef)?.then((response: any) => {
    response?.items?.forEach((item: any) => {
      getDownloadURL(item)?.then((url) => {
        if (item?._location?.path_ === `music/${src}/${name}`) {
          return setData(url);
        }
      });
    });
  });

  return setData;
};
