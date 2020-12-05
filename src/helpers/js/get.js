import Axios from "axios";

export default (endPoint, params = {}) => {
  return Axios.get(endPoint, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
    params: { ...params },
  });
};
