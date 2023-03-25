import axios from "axios";

const instance = axios.create({
  baseURL: "https://firestore.googleapis.com",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default instance;
