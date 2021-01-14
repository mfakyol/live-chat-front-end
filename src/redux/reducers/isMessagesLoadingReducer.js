//ActionTypes
const UPDATE_MESSAGES_IS_LOADİNG = 'UPDATE_MESSAGES_IS_LOADİNG';


//Reducer
export default function isMessagesLoading(state = true, {type, payload}) {
  switch (type) {
    case UPDATE_MESSAGES_IS_LOADİNG:
      return payload.status;
    default:
      return state;
  }
}


//Actions
export function updateIsMessagesLoading(status) {
  return {
    type: UPDATE_MESSAGES_IS_LOADİNG,
    payload: {
      status,
    },
  };
}
