import socket from "../../socket";

//ActionTypes
const SET_MESSAGES = "SET_MESSAGES";
const CLEAR_MESSAGES = "CLEAR_MESSAGES";
const PUSH_MESSAGE = "PUSH_MESSAGE";
const SET_MESSAGE_SEEN = "SET_MESSAGE_SEEN";

//Reducer
export default function messagesReducer(state = [], { payload, type }) {
  switch (type) {
    case SET_MESSAGE_SEEN:
      const seenDate = new Date(payload.data)
      return state.map((message) => {
        if(seenDate > new Date(message.sentDate)){
          message.isSeen = true;
        }
        return message;
      });
    case SET_MESSAGES:
      return payload.data;
    case PUSH_MESSAGE:
      return [...state, payload.data];
    case CLEAR_MESSAGES:
      return [];
    default:
      return state;
  }
}

//Actions
export function setMessages(data) {
  return {
    type: SET_MESSAGES,
    payload: {
      data,
    },
  };
}

export function pushMessage(data) {
  return {
    type: PUSH_MESSAGE,
    payload: {
      data,
    },
  };
}
export function setMessageSeen(data) {
  return (dispatch) => {
    dispatch({
      type: SET_MESSAGE_SEEN,
      payload: {
        data,
      },
    });
  };
}

export function clearMessages() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES,
      payload: {},
    });
  };
}

export function getLastMessages(chatId) {
  return (dispatch) => {
    socket.emit("getLastMessages", chatId, function (err, messages) {
      if (!err) {
        dispatch(setMessages(messages));
      }
    });
  };
}

export function sendImageMessage(chatId, imageMessageItem) {
  return (dispatch) => {
    console.log(imageMessageItem);
    socket.emit(
      "sendImageMessage",
      chatId,
      imageMessageItem,
      function (err, imageMessage) {
        if (!err) {
          dispatch(pushMessage(imageMessage));
        }
      }
    );
  };
}
