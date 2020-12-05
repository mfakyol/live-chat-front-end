import Axios from "axios";

export default (endPoint, data={}, params = {}) => {
  return Axios.post(endPoint, data, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
    params: { ...params },
  });
};
export const postWithFormData = (endPoint, data={}, params = {}) => {
  return Axios.post(endPoint, data, {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
    params: { ...params },
  });
};
