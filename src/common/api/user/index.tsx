import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "service/firebase";

//* User

export const userApi = {
  // get 모든 user 정보
  getUserAllDataList: () => async () => {
    const querySnapshot = await getDocs(collection(firestore, "users"));

    let array: any = [];

    querySnapshot?.forEach((doc: any) => {
      array = [...array, doc?.data()?.userInfo];
    });

    return array;
  },

  // 내 정보 수정
  editUserData: async (uid: any, data: any, user: any) => {
    const washingtonRef = doc(firestore, "users", uid);
    await setDoc(washingtonRef, {
      userInfo: {
        photoURL: data?.photoURL,
        name: data?.name,
        displayName: data?.displayName,
        email: user?.email,
        phoneNumber: data?.phoneNumber,
        creationTime: user?.creationTime,
      },
    });
  },
};

// 내 프로필 사진 삭제
export const userFunction = {
  deleteImg: (setForm: any, name: any) => {
    setForm((prev: any) => ({ ...prev, [name]: "" }));
  },
};
