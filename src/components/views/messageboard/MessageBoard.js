import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./message-board.module.css";
import InputField from "./inputfield/InputField";
import Profile from "../profile/Profile";
import {
  getLastMessages,
  clearMessages,
  setMessageSeen,
} from "../../../redux/reducers/messagesReducer";
import config from "../../../config";
import { Link } from "react-router-dom";
import TextMessage from "./textmessage/TextMessage";
import { resetUnread } from "../../../redux/reducers/unreadsReducer";
import ImageContainer from "./inputfield/Images/ImageContainer";
import ImageMessage from "./imagemessage/ImageMessage";
import { clearImages } from "../../../redux/reducers/imagesReducer";
import socket from "../../../socket";

class MessageBoard extends Component {
  componentDidMount() {
    
    socket.on("not", (chatId, date) => {
      console.log(chatId, date);
      if(this.props.match.params.chatId === chatId){
        this.props.onSetMessageSeen(date)
      }
    });
    const { chatId } = this.props.match.params;
    const sendLastSeenDate = (date) => {
     socket.emit('setLastSeen',  chatId, date, function(err, status){
       if(err){
         setTimeout(() => {
           sendLastSeenDate(Date.now())
         }, 1000);
       }
     })
    };
    this.props.onGetLastMessages(chatId);
    this.props.onResetUnread(chatId)
    sendLastSeenDate(Date.now());
  }

  componentDidUpdate(prevProps) {
    this.scrollToBottom();
    if (prevProps.match.params.chatId !== this.props.match.params.chatId) {
      this.props.onClearMessages();
      this.props.onClearImages();
      const { chatId } = this.props.match.params;
      const sendLastSeenDate = (date) => {
        socket.emit('setLastSeen',  chatId, date, function(err, status){
          if(err){
            setTimeout(() => {
              sendLastSeenDate(Date.now())
            }, 1000);
          }
        })
       };
       this.props.onGetLastMessages(chatId);
       this.props.onResetUnread(chatId)
       sendLastSeenDate(Date.now());
    }
  }

  componentWillUnmount() {
    this.props.onClearMessages();
  }
  state = {
    profileIsOpen: false,
  };
  scrollToBottom = () => {
    const { messageList } = this.refs;
    messageList.scrollIntoView({ block: "end", inline: "nearest" });
  };

  toggleProfile(e) {
    this.setState({
      profileIsOpen: !this.state.profileIsOpen,
    });
  }

  render() {
    let lastDate = undefined;
    const { chatId } = this.props.match.params;
    const { profileIsOpen } = this.state;
    const { chats, messages } = this.props;
    const userData = chats.filter((chat) => chat._id === chatId)[0];
    return (
      <main className={classes.main}>
        <div className={classes["message-board"]}>
          <div className={classes["message-board-header"]}>
            {userData ? (
              <>
                <img
                  src={`${config.apiDomain}/profileimages/${userData.user.profileImage}`}
                  alt=""
                />
                <span
                  onClick={this.toggleProfile.bind(this)}
                  className={classes.username}
                >
                  {userData.user.fullName}
                </span>
                <span className={classes.status}> Offline</span>
                <Link to="/chat">
                  {" "}
                  <i className="fas fa-times"></i>
                </Link>

                <Profile
                  isOpen={profileIsOpen}
                  toggleProfile={this.toggleProfile.bind(this)}
                  user={userData.user}
                />
              </>
            ) : null}
          </div>
          <div ref="messageList" className={classes.messages}>
            {messages.map((message) => {
              let isLeft = false;
              let newDay = false;
              if (userData) {
                isLeft = message.senderId === userData.user._id ? true : false;
              }
              const date = new Date(message.sentDate);
              if (lastDate) {
                if (
                  lastDate.getYear() !== date.getYear() ||
                  lastDate.getMonth() !== date.getMonth() ||
                  lastDate.getDay() !== date.getDay()
                ) {
                  newDay = true;
                }
              }
              lastDate = date;

              return (
                <React.Fragment key={message._id}>
                  {newDay ? (
                    <div className={classes["day-info"]}>
                      <span>
                      {date.getDay() +
                        " " +
                        date.toLocaleString("default", { month: "long" })}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {message.type === 0 ? (
                    <TextMessage
                      message={message}
                      isLeft={isLeft}
                    />
                  ) : message.type === 1 ? (
                    <ImageMessage
                      message={message}
                      isLeft={isLeft}
                    />
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <ImageContainer chatId={chatId} />
        <InputField chatId={chatId} />
      </main>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { chats: state.chats, messages: state.messages };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMessageSeen: (date) => dispatch(setMessageSeen(date)),
    onClearMessages: () => dispatch(clearMessages()),
    onClearImages: () => dispatch(clearImages()),
    onResetUnread: (chatId) => dispatch(resetUnread(chatId)),
    onGetLastMessages: (chatId, offset) => dispatch(getLastMessages(chatId, offset)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
