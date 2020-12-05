import socket from '../../socket'

//ActionTypes
const UPDATE_USER = "UPDATE_USER";

//Reducer
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload.data;
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

export function getUser() {
    return (dispatch) => {
      socket.emit('getUserData', function(err, userData){
        if(userData){
          console.log(userData)
          dispatch(updateUser(userData));
        }
      })
    
    };
}
