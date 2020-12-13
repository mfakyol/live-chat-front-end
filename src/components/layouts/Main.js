import jwt from "jsonwebtoken";
import socket from "../../socket";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getUser } from "../../redux/reducers/userReducer";
import { pushUnread } from "../../redux/reducers/unreadsReducer";
import {
  getChats,
  updateChatLastDate,
} from "../../redux/reducers/chatsReducer";
import { pushMessage } from "../../redux/reducers/messagesReducer";
import { getNotifications } from "../../redux/reducers/notificationsReducer";
import sound from "../../helpers/sound/message-sound.ogg";
import { getSoundIsOpen } from "../../redux/reducers/soundReducer";
var audio = new Audio(sound);

class Main extends Component {
  componentDidMount() {
    if (this.props.match.params.path) {
      this.props.history.push("/chat");
    }
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token || !jwt.decode(token) || !jwt.decode(token).apiKey) {
      localStorage.clear();
      this.props.history.push("/");
    }
    socket.on("connect", (e) => {
      console.log(e);
      console.log("connected");
    });

    socket.on("connected", () => {
      this.props.onGetSoundIsOpen();
      this.props.ongetUser();
      this.props.onGetChats();
      this.props.onGetNotifications();
      socket.on("newMessage", (newMessage) => {
        if (this.props.soundIsOpen) {
          audio.pause();
          audio.currentTime = 0;
          audio.play();
        }
        const { onUpdateChatLastDate, onPushMessage, onPushUnred } = this.props;
        if (newMessage.chatId === this.props.match.params.path) {
          onPushMessage(newMessage);
          socket.emit(
            "setLastSeen",
            newMessage.chatId,
            Date.now(),
            function (err, status) {}
          );
        } else {
          onPushUnred(newMessage.chatId);
        }
        onUpdateChatLastDate(newMessage.chatId, newMessage.sentDate);
      });
    });
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return { soundIsOpen: state.sound };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetUser: () => dispatch(getUser()),
    onGetChats: () => dispatch(getChats()),
    onGetSoundIsOpen: () => dispatch(getSoundIsOpen()),
    onPushUnred: (chatId) => dispatch(pushUnread(chatId)),
    onGetNotifications: () => dispatch(getNotifications()),
    onPushMessage: (message) => dispatch(pushMessage(message)),
    onUpdateChatLastDate: (chatId, date) =>
      dispatch(updateChatLastDate(chatId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
