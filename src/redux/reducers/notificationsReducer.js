import socket from "../../socket";

//ActionTypes
const UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS";
const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
const SET_NOTIFICATION_SEEN = "SET_NOTIFICATION_SEEN";

//Reducer
export default function notificationsReducer(state = [], { type, payload }) {
  switch (type) {
    case UPDATE_NOTIFICATIONS:
      return sortNotifications(payload.data);
    case PUSH_NOTIFICATION:
      return [...sortNotifications([...state, payload.data])];
    case SET_NOTIFICATION_SEEN:
      const updated = state.map(nt => {
        nt.isSeen = true
        return nt;
      })
      return [...sortNotifications(updated)];
    case REMOVE_NOTIFICATION:
      const newNotifications = state.filter(notification => notification._id !== payload.data)
      return [...sortNotifications(newNotifications)];
    default:
      return state;
  }
}

function sortNotifications(notifications){
  return notifications.sort( (a, b) => {
    return new Date(b.sentDate) - new Date(a.sentDate)
  })
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

export function setNotificationSeen(){
  return (dispatch) => {
    dispatch({
      type: SET_NOTIFICATION_SEEN,
      payload: {
      },
    });
}
}

export function removeNotification(notificationId) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_NOTIFICATION,
      payload: {
        data: notificationId
      }
    })
  }
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
