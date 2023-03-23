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

//* User

export const userApi = {
  getUserAllDataList: () => async () => {
    const querySnapshot = await getDocs(collection(firestore, "users"));

    let array: any = "";

    querySnapshot?.forEach((doc: any) => {
      array = [...array, doc?.data()?.userInfo];
    });

    return array;
  },

  editUserData: async (uid: any, data: any, user: any, setUser?: any) => {
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
      // getUserDataFunction(setUser);
    } catch (err) {
      alert("수정에 실패하였습니다.");
    }
  },
};
