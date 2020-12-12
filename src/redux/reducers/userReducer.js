import socket from "../../socket";

//ActionTypes
const UPDATE_USER = "UPDATE_USER";
const UPDATE_PROFILE_IMAGE = "UPDATE_PROFILE_IMAGE";

//Reducer
export default function userReducer(state = {}, { type, payload }) {
  switch (type) {
    case UPDATE_USER:
      return payload.data;
    case UPDATE_PROFILE_IMAGE:
      return { ...state, profileImage: payload.data };
    default:
      return state;
  }
}

//Actions
export function updateUser(data) {
  return {
    type: UPDATE_USER,
    payload: {
      data,
    },
  };
}
export function updateProfileImage(data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PROFILE_IMAGE,
      payload: {
        data,
      },
    });
  };
}

export function getUser() {
  return (dispatch) => {
    socket.emit("getUserData", function (err, userData) {
      if (userData) {
        console.log(userData);
        dispatch(updateUser(userData));
      }
    });
  };
}
