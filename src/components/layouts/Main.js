import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

import { connect } from "react-redux";
import { getUser } from "../../redux/reducers/userReducer";
import { pushUnread } from "../../redux/reducers/unreadsReducer";
import { getChats } from "../../redux/reducers/chatsReducer";
import { pushMessage } from "../../redux/reducers/messagesReducer";
import socket from "../../socket";

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
    console.log("çalıştı");
    socket.on("connect", (e) => {
      console.log(e);
      console.log("connected");
    });

    socket.on("connected", () => {
      this.props.ongetUser();
      this.props.onGetChats();
      socket.on("newMessage", (newMessage) => {
        if(newMessage.chatId===this.props.match.params.path){
          this.props.onPushMessage(newMessage)
          socket.emit('setLastSeen',  newMessage.chatId, Date.now(), function(err, status){
            
          })
        }
        else {
          this.props.onPushUnred(newMessage.chatId)
        }
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
    onPushUnred: (chatId) => dispatch(pushUnread(chatId)),
    onPushMessage: (message) => dispatch(pushMessage(message)),
    onGetChats: () => dispatch(getChats()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
