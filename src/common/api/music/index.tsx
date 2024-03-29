import {
  MusicCountListProps,
  MusicFormProps,
} from "components/AddMusic/interface";
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
  ref,
  deleteObject,
} from "firebase/storage";
import moment from "moment";
import { firestore, storage } from "service/firebase";
import { toastMsg } from "utility/toastMsg";

//* Cloud Firestore, Storage

export const musicApi = {
  // get Cloud Firestore all music List
  getMusicAllDataList: () => async () => {
    const querySnapshot = await getDocs(collection(firestore, "music"));
    let array: any = "";
    querySnapshot?.forEach((doc: any) => {
      array = doc?.data()?.data;
    });
    return array;
  },

  // add cloud firestore music
  sendMusicData: async (
    email: string,
    data: any,
    musicListData: any,
    url: string,
  ) => {
    const washingtonRef = doc(firestore, "music", "musicList");

    if (musicListData?.length === 0 || musicListData[0]?.title === "") {
      await setDoc(washingtonRef, {
        data: [
          {
            id: musicListData?.length,
            email: email,
            title: data?.title,
            singer: data?.singer,
            displayName: data?.displayName,
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
          id: musicListData[0]?.id + 1,
          email: email,
          title: data?.title,
          displayName: data?.displayName,
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

  // add storage muisc
  addStorageMusicData: async (
    src: any,
    data: any,
    setIsCompleted?: any,
    setData?: any,
    musicList?: any,
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
      metaData,
    );

    UploadTask.on(
      "state_changed",
      async (snapshot: any) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setIsCompleted("loading");
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(`error: image upload error ${JSON.stringify(error)}`);
        toastMsg("add", "failure");
      },
      async () => {
        await getDownloadURL(UploadTask.snapshot.ref).then(
          async (downloadUrl) => {
            if (downloadUrl) {
              await setData(src?.split("/")[1], data, musicList, downloadUrl);
              await toastMsg("add", "success");
              setIsCompleted("done");
              console.log(`완료 url: ${downloadUrl}`);
            }
          },
        );
      },
    );
  },

  // edit cloud firestore muisc
  updateMusicDataList: async (date: any) => {
    const washingtonRef = doc(firestore, "music", "musicList");

    await updateDoc(washingtonRef, {
      data: arrayRemove(),
    });

    await updateDoc(washingtonRef, { data: date });
  },

  // edit cloud firestore muisc like count and download count

  updateMusicCountData: async (
    type: string,
    musicList?: any,
    musicDetailData?: any,
    user?: any,
  ) => {
    const result = musicList?.map((item: MusicFormProps) => {
      if (type === "like") {
        if (item.id === musicDetailData?.id) {
          if (
            item?.likedClickList?.find((i: any) => i?.email === user?.email)
          ) {
            return {
              ...item,

              likeCount:
                type === "like" ? item?.likeCount - 1 : item?.likeCount,
              likedClickList:
                type === "like"
                  ? item?.likedClickList?.filter(
                      (i: any) => i?.email !== user?.email,
                    )
                  : item?.likedClickList,
            };
          } else {
            return {
              ...item,

              likeCount:
                type === "like" ? item?.likeCount + 1 : item?.likeCount,
              likedClickList:
                type === "like"
                  ? [
                      ...item?.likedClickList,
                      {
                        email: user?.email,
                        updateTiem: moment().format("YYYY-MM-DD HH:mm:ss"),
                      },
                    ]
                  : item?.likedClickList,
            };
          }
        }
        return {
          ...item,
        };
      }

      if (type === "download") {
        if (item.id === musicDetailData?.id) {
          if (
            item?.downloadClickList?.find(
              (i: MusicCountListProps) => i?.email === user?.email,
            )
          ) {
            return {
              ...item,

              downloadCount:
                type === "download"
                  ? item?.downloadCount - 1
                  : item?.downloadCount,
              downloadClickList:
                type === "download"
                  ? item?.downloadClickList?.filter(
                      (i: MusicCountListProps) => i?.email !== user?.email,
                    )
                  : item?.downloadClickList,
            };
          } else {
            return {
              ...item,

              downloadCount:
                type === "download"
                  ? item?.downloadCount + 1
                  : item?.downloadCount,
              downloadClickList:
                type === "download"
                  ? [
                      ...item?.downloadClickList,
                      {
                        email: user?.email,
                        updateTiem: moment().format("YYYY-MM-DD HH:mm:ss"),
                      },
                    ]
                  : item?.downloadClickList,
            };
          }
        }
        return {
          ...item,
        };
      }

      if (type === "download-all") {
        if (musicDetailData?.find((ac: any) => ac === item?.id)) {
          return {
            ...item,
            downloadCount: item?.downloadCount + 1,

            downloadClickList: [
              ...item?.downloadClickList,
              {
                email: user?.email,
                updateTiem: moment().format("YYYY-MM-DD HH:mm:ss"),
              },
            ],
          };
        }
        return {
          ...item,
        };
      }
    });

    const washingtonRef = doc(firestore, "music", "musicList");

    await updateDoc(washingtonRef, {
      data: arrayRemove(),
    });

    await updateDoc(washingtonRef, { data: result });
  },

  // delete cloud firestore music data
  deleteMusicData: async (data: any) => {
    const washingtonRef = doc(firestore, "music", "musicList");
    const desertRef = ref(storage, `music/${data?.email}/${data?.mp3}`);

    await updateDoc(washingtonRef, {
      data: arrayRemove(data),
    });

    await deleteObject(desertRef);
  },
};
