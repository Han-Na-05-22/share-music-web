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
import { firestore, storage } from "service/firebase";

//* Cloud Firestore, Storage

export const musicApi = {
  getMusicAllDataList: () => async () => {
    const querySnapshot = await getDocs(collection(firestore, "music"));
    let array: any = "";
    querySnapshot?.forEach((doc: any) => {
      array = doc?.data()?.data;
    });
    return array;
  },

  sendMusicData: async (
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
            id: musicListData?.length + 1 || 1,
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
  },

  addStorageMusicData: async (
    src: any,
    data: any,
    setIsCompleted?: any,
    setData?: any,
    musicList?: any
  ) => {
    const newName = data?.formData?.name
      .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
      .split(" ")
      .join("");

    const metaData = {
      contentType: data?.formData?.type,
      customMetadata: {
        genre: `${data?.genre}`,
        mpName: `${data?.formData?.name}`,
        title: `${data?.title}`,
        singer: `${data?.singer}`,
        explanation: `${data?.explanation}`,
        img: `${data?.img}`,
      },
    };

    const storageRef = sRef(storage, `${src}/` + newName + data?.uniqueKey);

    const UploadTask = uploadBytesResumable(
      storageRef,
      data?.formData,
      metaData
    );

    UploadTask.on(
      "state_changed",
      async (snapshot: any) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setIsCompleted("loading");
        console.log(`Upload is ${progress}% done`);
        if (progress === 100) {
          alert("음원 등록이 완료되었습니다.");
          setIsCompleted("done");
        }
      },
      (error) => {
        console.log(`error: image upload error ${JSON.stringify(error)}`);
        alert("음원 등록에 실패하였습니다.");
      },
      async () => {
        await getDownloadURL(UploadTask.snapshot.ref).then(
          async (downloadUrl) => {
            console.log(`완료 url: ${downloadUrl}`);
            await setData(src?.split("/")[1], data, musicList, downloadUrl);
            window.location.reload();
          }
        );
      }
    );
  },

  updateMusicDataList: () => async (date: any) => {
    const washingtonRef = doc(firestore, "music", "musicList");

    await updateDoc(washingtonRef, {
      data: arrayRemove(),
    });

    await updateDoc(washingtonRef, { data: date });
  },
};
