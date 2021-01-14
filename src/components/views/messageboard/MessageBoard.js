import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./message-board.module.css";
import InputField from "./inputfield/InputField";
import Profile from "../profile/Profile";
import {
  getLastMessages,
  getOldMessages,
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
import LoadingSpinner from "../../common/LoadingSpinner";

class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.messageboard = React.createRef();
  }

  state = {
    isOnline: false,
    profileIsOpen: false,
    isFetching: true,
    canFetchMore: true,
  };
  async componentDidMount() {
    this.messageboard.current.addEventListener("scroll", async (e) => {
      if (
        e.target.scrollTop <= 50 &&
        !this.state.isFetching &&
        this.state.canFetchMore && this.props.messages.length > 0
      ) {
        await this.setState({
          isFetching: true,
          oldScrollheight: e.target.scrollHeight,
        });
        await this.props.onGetOldMessages(
          chatId,
          this.props.messages[0].sentDate
        );
      }
    });
    socket.on("setSeen", (chatId, date) => {
      if (this.props.match.params.chatId === chatId)
        this.props.onSetMessageSeen(date);
    });

    const { chatId } = this.props.match.params;
    const sendLastSeenDate = (date) => {
      socket.emit("setLastSeen", chatId, date, function (err, status) {
        if (err) {
          setTimeout(() => {
            sendLastSeenDate(Date.now());
          }, 1000);
        }
      });
    };
    await this.props.onGetLastMessages(chatId);
    this.props.onResetUnread(chatId);
    sendLastSeenDate(Date.now());
    socket.on("isOnline", (status) => {
      this.setState({ isOnline: status });
    });
    socket.emit("connectUserStatus", chatId, (err, status) => {
      this.setState({ isOnline: status });
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isFetching !== this.state.isFetching) return false;
    if (nextState.canFetchMore !== this.state.canFetchMore) return false;
    return true;
  }

  async componentDidUpdate(prevProps) {
    if (!this.state.isFetching) {
      this.scrollToBottom();
    } else {
      this.messageboard.current.scrollTop =
        this.messageboard.current.scrollHeight - this.state.oldScrollheight;
      if (prevProps.messages.length + 20 > this.props.messages.length && prevProps.messages.length !== 0 ) {
        this.setState({ canFetchMore: false });
      }
      this.setState({ isFetching: false });
    }
    if (prevProps.match.params.chatId !== this.props.match.params.chatId) {
      await this.props.onClearMessages();
      await this.props.onClearImages();
      this.setState({ profileIsOpen: false });
      this.setState({ isFetching: false, canFetchMore: true });
      socket.emit("disConnectUserStatus", prevProps.match.params.chatId);
      socket.emit(
        "connectUserStatus",
        this.props.match.params.chatId,
        (err, status) => {
          this.setState({ isOnline: status });
        }
      );
      const { chatId } = this.props.match.params;
      const sendLastSeenDate = (date) => {
        socket.emit("setLastSeen", chatId, date, function (err, status) {
          if (err) {
            setTimeout(() => {
              sendLastSeenDate(Date.now());
            }, 1000);
          }
        });
      };
      await this.props.onGetLastMessages(chatId);
      this.setState({isFetching: false})
      this.props.onResetUnread(chatId);
      sendLastSeenDate(Date.now());
    }
  }

  componentWillUnmount() {
    this.props.onClearMessages();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({});
  };

  toggleProfile(e) {
    this.setState({
      profileIsOpen: !this.state.profileIsOpen,
    });
  }

  render() {
    let lastDate = undefined;
    const { chatId } = this.props.match.params;
    const { profileIsOpen, isOnline, } = this.state;
    const { chats, messages, isMessagesLoading } = this.props;
    const userData = chats.filter((chat) => chat._id === chatId)[0];
    return (
      <main className={classes.main}>
        <div ref={this.messageboard} className={classes["message-board"]}>
          <LoadingSpinner status={isMessagesLoading}/>
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
                <span className={classes.status}>
                  {isOnline ? "Online" : "Offline"}
                </span>
                <Link to="/chat">
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
          <div id="messageList" className={classes.messages}>
            {messages.length > 0 ? (
              <div className={classes["day-info"]}>
                <span>
                  {`${new Date(messages[0].sentDate).getDate()}  ${new Date(
                    messages[0].sentDate
                  ).toLocaleString("default", { month: "long" })}`}
                </span>
              </div>
            ) : null}
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
                        {date.getDate() +
                          " " +
                          date.toLocaleString("default", { month: "long" })}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {message.type === 0 ? (
                    <TextMessage message={message} isLeft={isLeft} />
                  ) : message.type === 1 ? (
                    <ImageMessage message={message} isLeft={isLeft} />
                  ) : null}
                </React.Fragment>
              );
            })}
            <div
              style={{ float: "left", clear: "both" }}
              ref={(el) => {
                this.messagesEnd = el;
              }}
            ></div>
          </div>
        </div>
        <ImageContainer chatId={chatId} />
        <InputField
          scrollToBottom={this.scrollToBottom.bind(this)}
          chatId={chatId}
        />
      </main>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { chats: state.chats, messages: state.messages, isMessagesLoading: state.isMessagesLoading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMessageSeen: (date) => dispatch(setMessageSeen(date)),
    onClearMessages: () => dispatch(clearMessages()),
    onClearImages: () => dispatch(clearImages()),
    onResetUnread: (chatId) => dispatch(resetUnread(chatId)),
    onGetLastMessages: (chatId) => dispatch(getLastMessages(chatId)),
    onGetOldMessages: (chatId, date) => dispatch(getOldMessages(chatId, date)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
