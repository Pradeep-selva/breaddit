import axios from "axios";
import { BASE_URL, VERSION } from "../Configs";
import { SECRETS } from "../secrets";

const API_URL = `${BASE_URL}/api/${VERSION}`;

const getInstance = (baseURL = API_URL) => {
  return axios.create({
    baseURL,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "x-api-key": SECRETS.x_api_key
    }
  });
};

export default {
  getInstance
};
