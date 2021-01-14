import { combineReducers } from "redux";
import example from "./exampleReducer";
import user from "./userReducer";
import chats from "./chatsReducer";
import unReads from "./unreadsReducer";
import messages from "./messagesReducer";
import images from "./imagesReducer";
import notifications from "./notificationsReducer";
import sound from "./soundReducer";
import isMessagesLoading from './isMessagesLoadingReducer'
import isChatsLoading from './isChatsLoadingReducer'

export default combineReducers({
  example,
  user,
  chats,
  unReads,
  messages,
  images,
  notifications,
  sound,
  isMessagesLoading,
  isChatsLoading
});
