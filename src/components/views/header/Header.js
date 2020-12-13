import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import { withRouter } from "react-router-dom";
import MyProfile from "../profile/MyProfile";
import { connect } from "react-redux";
import config from "../../../config";
import socket from "../../../socket";
import { pushChat } from "../../../redux/reducers/chatsReducer";
import {
  pushNotification,
  removeNotification,
  setNotificationSeen,
} from "../../../redux/reducers/notificationsReducer";
import { updateSound } from "../../../redux/reducers/soundReducer";

class Header extends Component {
  state = {
    myProfile: false,
    notificationsIsOpen: false,
    accountMenuIsOpen: false,
  };

  componentDidMount() {
    socket.on("newNotification", (notification) => {
      this.props.onPushNotification(notification);
    });
  }

  toggleAccountMenu(e) {
    if (!this.state.accountMenuIsOpen) {
      this.setState({
        notificationsIsOpen: false,
      });
    }
    this.setState({
      accountMenuIsOpen: !this.state.accountMenuIsOpen,
    });
  }

  toggleNotification() {
    if (!this.state.notificationsIsOpen) {
      this.props.onSetNotificationSeen();
      socket.emit("setNotificationLastSeen", Date.now());
      this.setState({
        accountMenuIsOpen: false,
      });
    }
    this.setState({
      notificationsIsOpen: !this.state.notificationsIsOpen,
    });
  }

  answerRequest(requestId, answer, e) {
    console.log(requestId, answer);
    socket.emit("answerRequest", requestId, answer, (err, chat) => {
      if (!err) {
        if (chat) {
          this.props.onPushChat(chat);
          this.props.onRemoveNotification(requestId);
        } else {
          this.props.onRemoveNotification(requestId);
        }
      }
    });
  }

  copyUserId(id, e) {
    var inp = document.createElement("input");
    document.body.appendChild(inp);
    inp.value = id;
    inp.select();
    document.execCommand("copy", false);
    inp.remove();
  }

  toggleSound(e) {
    this.props.onUpdateSound(!this.props.sound);
  }

  toggleMyProfile(e) {
    this.setState({
      myProfile: !this.state.myProfile,
      accountMenuIsOpen: false,
    });
  }

  logOut(e) {
    socket.disconnect();
    localStorage.clear("token");
    this.props.history.push("/");
  }

  render() {
    const { user, notifications, sound } = this.props;
    const { notificationsIsOpen, accountMenuIsOpen } = this.state;
    return (
      <header className={classes.header}>
        <Link to="/" className={classes.brand}>
          <h1>
            Live Chat <span></span>
          </h1>
        </Link>
        <div className={classes["notification-container"]}>
          <i
            onClick={this.toggleNotification.bind(this)}
            className="fas fa-bell"
          ></i>
          <span
            style={{
              display:
                notifications.filter((nt) => !nt.isSeen).length > 0
                  ? "flex"
                  : "none",
            }}
          >
            {notifications.filter((nt) => !nt.isSeen).length}
          </span>

          <div
            style={{ display: notificationsIsOpen ? "block" : "none" }}
            className={classes["notification-list"]}
          >
            <h3>Notifications</h3>
            <hr />
            {notifications.map((notification) => {
              if (notification.type === 0) {
                return (
                  <div
                    key={notification._id}
                    className={classes["notification"]}
                  >
                    <img
                      src={`${config.apiDomain}/profileImages/${notification.sender.profileImage}`}
                      alt=""
                    />
                    <span>
                      <b>{notification.sender.fullName}</b> sent friend request
                    </span>
                    <i
                      onClick={this.answerRequest.bind(
                        this,
                        notification._id,
                        true
                      )}
                      className={`${classes["accept"]} fas fa-check`}
                    ></i>
                    <i
                      onClick={this.answerRequest.bind(
                        this,
                        notification._id,
                        false
                      )}
                      className={`${classes["reject"]} fas fa-times`}
                    ></i>
                  </div>
                );
              } else if (notification.type === 1) {
                return (
                  <div
                    key={notification._id}
                    className={classes["notification"]}
                  >
                    <img
                      src={`${config.apiDomain}/profileImages/${notification.reciever.profileImage}`}
                      alt=""
                    />
                    <p>
                      <b>{notification.reciever.fullName}</b>{" "}
                      {notification.answer
                        ? "accepted friend request."
                        : "rejected friend request."}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        {user.profileImage ? (
          <>
            <div className={classes.account}>
              <img
                onClick={this.toggleAccountMenu.bind(this)}
                className={classes["user-image"]}
                src={`${config.apiDomain}/profileimages/${user.profileImage}`}
                alt=""
              />
              <div
                style={{ display: accountMenuIsOpen ? "block" : "none" }}
                id="account-menu"
                className={classes["account-menu"]}
              >
                <span className={classes["account-info"]}>
                  <img
                    className={classes["user-image"]}
                    src={`${config.apiDomain}/profileimages/${user.profileImage}`}
                    alt=""
                  />
                  <p className={classes.username}>{user.fullName}</p>
                  <p className={classes.email}>{user.email}</p>
                  <p className={classes["user-id"]}>
                    User Id:{" "}
                    <span
                      onClick={this.copyUserId.bind(this, user.shortId)}
                      title="Click to copy"
                    >{`${user.shortId}`}</span>
                  </p>
                  <hr />
                  <div className={classes["sound-container"]}>
                    <span> Message Sound: </span>
                    <label className={classes["switch"]}>
                      <input onClick={this.toggleSound.bind(this)} readOnly checked={sound} type="checkbox" />
                      <span className={classes["slider"]}></span>
                    </label>
                  </div>
                  <div className={classes["menu-items"]}>
                    <span
                      onClick={this.toggleMyProfile.bind(this)}
                      className={classes["menu-item"]}
                    >
                      Profile
                    </span>
                    <span
                      onClick={this.logOut.bind(this)}
                      className={classes["menu-item"]}
                    >
                      Log Out
                    </span>
                  </div>
                </span>
              </div>
            </div>
            <MyProfile
              user={user}
              toggleMyProfile={this.toggleMyProfile.bind(this)}
              isOpen={this.state.myProfile}
            />
          </>
        ) : null}
      </header>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    notifications: state.notifications,
    sound: state.sound,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPushChat: (chat) => dispatch(pushChat(chat)),
    onPushNotification: (notification) =>
      dispatch(pushNotification(notification)),
    onRemoveNotification: (notificationId) =>
      dispatch(removeNotification(notificationId)),
    onSetNotificationSeen: () => dispatch(setNotificationSeen()),
    onUpdateSound: (data) => dispatch(updateSound(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
