//ActionTypes
const UPDATE_IS_CHAT_LOADING = 'UPDATE_IS_CHAT_LOADING';


//Reducer
export default function isChatLoadingReducer(state = true, {type, payload}) {
  switch (type) {
    case UPDATE_IS_CHAT_LOADING:
      return payload.status;
    default:
      return state;
  }
}


//Actions
export function updateIsChatLoading(status) {
  return {
    type: UPDATE_IS_CHAT_LOADING,
    payload: {
      status,
    },
  };
}
