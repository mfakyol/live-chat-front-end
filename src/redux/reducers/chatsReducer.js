import socket from "../../socket";

//ActionTypes
const UPDATE_CHATS = "UPDATE_CHATS";

//Reducer
export default function chatsReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_CHATS:
      return action.payload.data;
    default:
      return state;
  }
}

//Actions
export function updateChats(data) {
  data.sort((a, b) => {
    if (a.lastDate > b.lastDate) {
      return -1;
    } else if (a.lastDate < b.lastDate) {
      return 1;
    } else {
      return 0;
    }
  });

  return {
    type: UPDATE_CHATS,
    payload: {
      data,
    },
  };
}

export function getChats() {
  return (dispatch) => {
    socket.emit("getChats", function (err, chats) {
      dispatch(updateChats(chats));
    });
  };
}
