import socket from "../../socket";
import {updateIsChatLoading} from './isChatsLoadingReducer'

//ActionTypes
const UPDATE_CHAT_LAST_DATE = "UPDATE_CHAT_LAST_DATE";
const UPDATE_CHATS = "UPDATE_CHATS";
const PUSH_CHAT = "PUSH_CHAT";

//Reducer
export default function chatsReducer(state = [], { type, payload }) {
  switch (type) {
    case UPDATE_CHATS:
      return payload.data;
    case PUSH_CHAT:
      return [...sortChats([...state, payload.data])]
    case UPDATE_CHAT_LAST_DATE:
      return [
        ...sortChats(
          state.map((chat) => {
            if (chat._id === payload.chatId) {
              chat.lastDate = payload.date;
            }
            return chat;
          })
        ),
      ];
    default:
      return state;
  }
}

//Actions
export function updateChats(data) {
  sortChats(data);
  return {
    type: UPDATE_CHATS,
    payload: {
      data: sortChats(data),
    },
  };
}
export function pushChat(data) {
  return (dispatch) => {
    dispatch({
      type: PUSH_CHAT,
      payload: {
        data
      },
    });
  };
}

export function updateChatLastDate(chatId, date) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CHAT_LAST_DATE,
      payload: {
        chatId,
        date,
      },
    });
  };
}

function sortChats(chats) {
  return chats.sort((a, b) => {
    if (a.lastDate > b.lastDate) {
      return -1;
    } else if (a.lastDate < b.lastDate) {
      return 1;
    } else {
      return 0;
    }
  });
}

export function getChats() {
  return (dispatch) => {
    socket.emit("getChats", function (err, chats) {
      dispatch(updateChats(chats));
      dispatch(updateIsChatLoading(false))
    });
  };
}
