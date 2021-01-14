import socket from "../../socket";
import {updateIsMessagesLoading} from './isMessagesLoadingReducer'

//ActionTypes
const SET_MESSAGES = "SET_MESSAGES";
const CLEAR_MESSAGES = "CLEAR_MESSAGES";
const PUSH_MESSAGE = "PUSH_MESSAGE";
const SET_MESSAGE_SEEN = "SET_MESSAGE_SEEN";
const SET_OLD_MESSAGES = "SET_OLD_MESSAGES";

//Reducer
export default function messagesReducer(state = [], { payload, type }) {
  switch (type) {
    case SET_MESSAGE_SEEN:
      const seenDate = new Date(payload.data);
      return state.map((message) => {
        if (seenDate > new Date(message.sentDate)) {
          message.isSeen = true;
        }
        return message;
      });
    case SET_MESSAGES:
      return payload.data;
    case SET_OLD_MESSAGES:
      return [...payload.messages, ...state];
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
    dispatch(updateIsMessagesLoading(true))
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
        dispatch(updateIsMessagesLoading(false))
      }
    });
  };
}
export function getOldMessages(chatId, date) {
  return (dispatch) => {
    socket.emit("getOldMessages", chatId, date, function (err, messages) {
      if (!err) {
        dispatch({
          type: SET_OLD_MESSAGES,
          payload: { messages },
        });
      }
    });
  };
}
