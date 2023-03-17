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
import { auth, firestore, storage } from "service/firebase";

// 데이터베이스에 저장된 모든 음원리스트들을 불러오기 위한 함수(Cloud Firestore)
export const getMusicListDataFunction = async (setMusicListData: any) => {
  const querySnapshot = await getDocs(collection(firestore, "music"));
  let array: any = "";
  querySnapshot?.forEach((doc: any) => {
    array = doc?.data()?.data;
    return setMusicListData(array);
  });
};

// 모든 user 정보를 불러오기 위한 함수
export const getUsersListDataFunction = async (setUsersData: any) => {
  const querySnapshot = await getDocs(collection(firestore, "users"));

  let array: any = "";

  querySnapshot?.forEach((doc: any) => {
    array = [...array, doc?.data()?.userInfo];

    return setUsersData(array);
  });
};

// 음악 추가 시  데이터베이스에 해당 음원 정보 저장(Cloud Firestore)
export const sendMusicDataFunction = async (
  email: string,
  data: any,
  musicListData: any,
  url: any
) => {
  const washingtonRef = doc(firestore, "music", "musicList");
  console.log("email", email);
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

// 좋아요 또는 다운로드 클릭 시 count 및 클릭한 user 정보 DB에 저장하는 함수(Cloud Firestore)
export const sendUpdateLikeDownloadCountFunction = async (date: any) => {
  const washingtonRef = doc(firestore, "music", "musicList");

  await updateDoc(washingtonRef, {
    data: arrayRemove(),
  });

  await updateDoc(washingtonRef, { data: date });
};

// 음원 등록하기 함수(Storage)
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

        sendMusicDataFunction(src?.split("/")[1], form, musicList, downloadUrl);
      });
    }
  );
};

// 내가 등록한 음원리스트들을 불러오는 함수(Storage)
// export const myMusicListFunction = (src: any, setData?: any) => {
//   if (!src) {
//     return;
//   }
//   const MusicListRef = sRef(storage, `${src}/`);

//   let array: any = "";

//   listAll(MusicListRef)
//     .then((res) => {
//       res?.items?.forEach((item: any) => {
//         getDownloadURL(item)?.then((url) => {
//           const forestRef = ref(storage, `${item?._location?.path_}`);
//           getMetadata(forestRef)
//             .then((metadata) => {
//               array = [
//                 ...array,
//                 { url: url, path: item?._location?.path_, meta: metadata },
//               ];
//               return array;
//             })
//             .catch((error) => {
//               console.log("err", error);
//             });
//         });
//       });
//     })
//     .catch((error) => {
//       console.log("err", error);
//     });

//   return setData;
// };

// 음원 상세보기 오디오 URL (Storage)
// export const getMusicUrlFunction = (src: any, setData: any, name: any) => {
//   if (!src) {
//     return;
//   }

//   const MusicListRef = sRef(storage, `music/${src}/`);

//   listAll(MusicListRef)?.then((response: any) => {
//     response?.items?.forEach((item: any) => {
//       getDownloadURL(item)?.then((url) => {
//         if (item?._location?.path_ === `music/${src}/${name}`) {
//           return setData(url);
//         }
//       });
//     });
//   });

//   return setData;
// };

// user 정보 수정
// todo : ★ 해당 기호 있는 todo 찾아서 아래 함수 사용할 것.
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
    console.log("err : ", err);
    alert("수정에 실패하였습니다.");
  }
};

// 로그인 한 user 정보를 불러오기 위한 함수
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
