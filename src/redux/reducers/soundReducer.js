//ActionTypes
const UPDATE_SOUND = 'UPDATE_SOUND';


//Reducer
export default function exampleReducer(state = true, {payload, type}) {
  switch (type) {
    case UPDATE_SOUND:
      return payload.data;
    default:
      return state;
  }
}


//Actions
export function updateSound(data) {
  localStorage.setItem("sound", JSON.stringify(data))
  return {
    type: UPDATE_SOUND,
    payload: {
      data,
    },
  };
}

export function getSoundIsOpen() {
  return (dispatch) => {
    let sound = JSON.parse(localStorage.getItem("sound"))
    console.log(sound)
    if(sound === null){
      sound = true
      localStorage.setItem("sound", JSON.stringify(true))
    }
    dispatch(updateSound(sound));
  };
}