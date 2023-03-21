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
} from "firebase/storage";
import { auth, firestore, storage } from "service/firebase";

//* Cloud Firestore

// 전체 데이터베이스 가져옴
export const getMusicListDataFunction = async (setMusicListData: any) => {
  const querySnapshot = await getDocs(collection(firestore, "music"));
  let array: any = "";
  querySnapshot?.forEach((doc: any) => {
    array = doc?.data()?.data;
    return setMusicListData(array);
  });
};

// 음원 등록 함수
export const sendMusicDataFunction = async (
  email: string,
  data: any,
  musicListData: any,
  url: any
) => {
  const washingtonRef = doc(firestore, "music", "musicList");

  if (musicListData?.length === 0) {
    await setDoc(washingtonRef, {
      data: [
        {
          id: musicListData?.length + 1,
          email: email,
          title: data?.title,
          singer: data?.singer,
          explanation: data?.explanation,
          img: data?.img,
          date: data?.date,
          genre: data?.genre,
          url: url,
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
        email: email,
        title: data?.title,
        singer: data?.singer,
        explanation: data?.explanation,
        img: data?.img,
        date: data?.date,
        genre: data?.genre,
        url: url,
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

// 좋아요 또는 다운로드 count db 저장
export const sendUpdateLikeDownloadCountFunction = async (date: any) => {
  const washingtonRef = doc(firestore, "music", "musicList");

  await updateDoc(washingtonRef, {
    data: arrayRemove(),
  });

  await updateDoc(washingtonRef, { data: date });
};

//* User

// 모든 user 정보 가져옴
export const getUsersListDataFunction = async (setUsersData: any) => {
  const querySnapshot = await getDocs(collection(firestore, "users"));

  let array: any = "";

  querySnapshot?.forEach((doc: any) => {
    array = [...array, doc?.data()?.userInfo];

    return setUsersData(array);
  });
};

// user 데이터 수정 함수
export const sendUserDataFunction = async (
  uid: any,
  data: any,
  user: any,
  setUser?: any
) => {
  try {
    const washingtonRef = doc(firestore, "users", uid);
    await setDoc(washingtonRef, {
      userInfo: {
        profile: data?.profile,
        name: data?.name,
        nickName: data?.nickName,
        email: user?.email,
        phoneNumber: data?.phoneNumber,
        creationTime: user?.creationTime,
      },
    });

    await alert("수정이 완료되었습니다.");
    getUserDataFunction(setUser);
  } catch (err) {
    alert("수정에 실패하였습니다.");
  }
};

// 로그인 한 user 정보 불러오기
export const getUserDataFunction = async (setUser: any) => {
  const querySnapshot = await getDocs(collection(firestore, "users"));
  const getUserInfo: any = sessionStorage?.getItem(
    `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
  );
  querySnapshot?.forEach((doc: any) => {
    if (
      doc?.id === auth?.currentUser?.uid?.replace("", "") ||
      doc?.id === getUserInfo?.uid
    ) {
      return setUser(doc?.data()?.userInfo);
    }
  });
};

//* Storage

// mp3 파일 저장 함수
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

  setIsCompleted?: any,
  setMusicList?: any,
  form?: any,
  musicList?: any
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
      }
    },
    (error) => {
      alert("음원 등록에 실패하였습니다.");
      console.log(`error: image upload error ${JSON.stringify(error)}`);
    },
    async () => {
      await getDownloadURL(UploadTask.snapshot.ref).then((downloadUrl) => {
        console.log(`완료 url: ${downloadUrl}`);

        sendMusicDataFunction(src?.split("/")[1], form, musicList, downloadUrl);
      });
      getMusicListDataFunction(setMusicList);
    }
  );
};
