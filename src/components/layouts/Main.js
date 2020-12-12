import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

import { connect } from "react-redux";
import { getUser } from "../../redux/reducers/userReducer";
import { pushUnread } from "../../redux/reducers/unreadsReducer";
import { getChats, updateChatLastDate } from "../../redux/reducers/chatsReducer";
import { pushMessage } from "../../redux/reducers/messagesReducer";
import socket from "../../socket";
import { getNotifications } from "../../redux/reducers/notificationsReducer";

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
      this.props.ongetUser();
      this.props.onGetChats();
      this.props.onGetNotifications();
      socket.on("newMessage", (newMessage) => {
        const {onUpdateChatLastDate, onPushMessage, onPushUnred} = this.props;
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
        onUpdateChatLastDate(newMessage.chatId, newMessage.sentDate)
      });
    });
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetUser: () => dispatch(getUser()),
    onGetChats: () => dispatch(getChats()),
    onPushUnred: (chatId) => dispatch(pushUnread(chatId)),
    onGetNotifications: () => dispatch(getNotifications()),
    onPushMessage: (message) => dispatch(pushMessage(message)),
    onUpdateChatLastDate: (chatId, date) => dispatch(updateChatLastDate(chatId, date)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
