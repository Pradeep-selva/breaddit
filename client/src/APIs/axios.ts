import axios from "axios";
// import jwtDecode from "jwt-decode";
import { BASE_URL, VERSION } from "../Configs";

const API_URL = `${BASE_URL}/api/${VERSION}`;

const getInstance = (baseURL = API_URL) => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
      "x-api-key": `${process.env.REACT_APP_X_API_KEY}`,
      authorization: `Bearer ${localStorage.getItem("AuthToken") || ""}`
    }
  });
};

const axiosInstance = {
  getInstance
};

export default axiosInstance;
