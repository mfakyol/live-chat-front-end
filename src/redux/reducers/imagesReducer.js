
//ActionTypes

const CLEAR_IMAGES = "CLEAR_IMAGES";
const PUSH_IMAGES = "PUSH_IMAGES";
const REMOVE_IMAGE = "REMOVE_IMAGE";

//Reducer
export default function imagesReducer(state = [], { type, payload }) {
  switch (type) {
    case PUSH_IMAGES:
      return [...state, ...payload.data];
    case REMOVE_IMAGE:
      return [...state.filter((image, index) => index === payload.index)];
    case CLEAR_IMAGES:
      return [];
    default:
      return state;
  }
}

//Actions

export function pushImages(data) {
  return {
    type: PUSH_IMAGES,
    payload: {
      data,
    },
  };
}
export function removeImage(index) {
  return {
    type: REMOVE_IMAGE,
    payload: {
      index,
    },
  };
}
export function clearImages() {
  return {
    type: CLEAR_IMAGES,
    payload: {},
  };
}
