import axios from "axios";

const instance = axios.create({
  baseURL: "https://firestore.googleapis.com",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.message === "Network Error" || error.response.status === 401) {
//       if (
//         !sessionStorage.getItemgetItem(
//           `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
//         )
//       ) {
//         window.location.href = "/";
//         return false;
//       }
//       sessionStorage.removeItemgetItem(
//         `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
//       );
//       window.location.href = "/";
//       return Promise.reject(error);
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
