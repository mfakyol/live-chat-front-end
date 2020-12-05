import socket from "../../socket";

//ActionTypes
const ADD_UNREAD = "ADD_UNREAD";
const PUSH_UNREAD = "PUSH_UNREAD";
const RESET_UNREAD = "RESET_UNREAD";

//Reducer
export default function unreadsReducer(state = {}, { payload, type }) {
  switch (type) {
    case ADD_UNREAD:
      return { ...state, [payload.chatId]: payload.unRead };
    case PUSH_UNREAD:
      state[payload.chatId] += 1;
      return { ...state };
    case RESET_UNREAD:
      state[payload.chatId] = 0;
      return { ...state };
    default:
      return state;
  }
}

//Actions
export function updateUnreads(chatId, unRead) {
  return {
    type: ADD_UNREAD,
    payload: {
      chatId,
      unRead,
    },
  };
}
export function pushUnread(chatId, unRead) {
  return {
    type: PUSH_UNREAD,
    payload: {
      chatId,
    },
  };
}

export function resetUnread(chatId) {
  return {
    type: RESET_UNREAD,
    payload: {
      chatId,
    },
  };
}

export function getUnreads(chatId, senderId) {
  return (dispatch) => {
    socket.emit("getUnreads", chatId, senderId, function (err, unRead) {
      dispatch(updateUnreads(chatId, unRead));
    });
  };
}
