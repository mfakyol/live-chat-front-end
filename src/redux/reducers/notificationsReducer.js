import socket from "../../socket";

//ActionTypes
const UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS";
const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";

//Reducer
export default function notificationsReducer(state = [], { type, payload }) {
  switch (type) {
    case UPDATE_NOTIFICATIONS:
      return payload.data;
    case PUSH_NOTIFICATION:
      return [...state, payload.data];
    default:
      return state;
  }
}

//Actions
export function updateNotifications(data) {
  return {
    type: UPDATE_NOTIFICATIONS,
    payload: {
      data,
    },
  };
}

export function pushNotification(notification) {
  return (dispatch) => {
    dispatch({
      type: PUSH_NOTIFICATION,
      payload: {
        data: notification,
      },
    });
  };
}

export function getNotifications(userId) {
  return (dispatch) => {
    socket.emit("getNotifications", (err, notifications) => {
      if (!err) {
        dispatch(updateNotifications(notifications));
      }
    });
  };
}
