import socket from "../../socket";

//ActionTypes
const UPDATE_CHAT_LAST_DATE = "UPDATE_CHAT_LAST_DATE";
const PUSH_CHATS = "PUSH_CHATS";

//Reducer
export default function chatsReducer(state = [], { type, payload }) {
  switch (type) {
    case PUSH_CHATS:
      return payload.data;
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
export function pushChats(data) {
  sortChats(data);
  return {
    type: PUSH_CHATS,
    payload: {
      data: sortChats(data),
    },
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
      dispatch(pushChats(chats));
    });
  };
}
