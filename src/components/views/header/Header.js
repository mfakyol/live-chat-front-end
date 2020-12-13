import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import { withRouter } from "react-router-dom";
import MyProfile from "../profile/MyProfile";
import { connect } from "react-redux";
import config from "../../../config";
import socket from "../../../socket";
import { pushChat } from "../../../redux/reducers/chatsReducer";
import { pushNotification, removeNotification, setNotificationSeen } from "../../../redux/reducers/notificationsReducer";

class Header extends Component {
  state = {
    myProfile: false,
    notificationsIsOpen: false,
  };

  componentDidMount(){
    socket.on("newNotification", notification => {
      this.props.onPushNotification(notification)
    })
  }

  openAccountMenu(e) {
    const menu = e.target.nextSibling;
    if (menu.style.display !== "inline-block") {
      menu.style.display = "inline-block";
      const closeAccountMenu = (e) => {
        try {
          document.querySelector("#account-menu").style.display = "none";
          document.removeEventListener("click", closeAccountMenu);
        } catch (e) {}
      };
      document.addEventListener("click", closeAccountMenu);
    }
  }
  toggleNotification() {
    if(!this.state.notificationsIsOpen){
      this.props.onSetNotificationSeen()
      socket.emit("setNotificationLastSeen",Date.now())
    }
    this.setState({
      notificationsIsOpen: !this.state.notificationsIsOpen,
    });
  }

  answerRequest(requestId, answer, e) {
    console.log(requestId, answer);
    socket.emit("answerRequest", requestId, answer, (err, chat) => {
      if(!err){
        if(chat){
          this.props.onPushChat(chat)
          this.props.onRemoveNotification(requestId)
        }
        else {
          this.props.onRemoveNotification(requestId)
        }
      }
    });
  }

  toggleMyProfile(e) {
    this.setState({ myProfile: !this.state.myProfile });
  }

  logOut(e) {
    localStorage.clear("token");
    this.props.history.push("/");
  }

  render() {
    const { user, notifications } = this.props;
    const { notificationsIsOpen } = this.state;
    return (
      <header className={classes.header}>
        <Link to="/" className={classes.brand}>
          <h1>
            Live Chat <span></span>
          </h1>
        </Link>
        Id: {user.shortId}
        <div className={classes["notification-container"]}>
          <i
            onClick={this.toggleNotification.bind(this)}
            className="fas fa-bell"
          >
          </i>
            <span style = {{display: notifications.filter(nt => !nt.isSeen).length > 0 ?"flex": "none"}}>{notifications.filter(nt => !nt.isSeen).length}</span>
          
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
                      <b>{notification.reciever.fullName}</b> {notification.answer ? "accepted friend request." : "rejected friend request."}
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
                onClick={this.openAccountMenu.bind(this)}
                className={classes["user-image"]}
                src={`${config.apiDomain}/profileimages/${user.profileImage}`}
                alt=""
              />
              <div id="account-menu" className={classes["account-menu"]}>
                <span className={classes["account-info"]}>
                  <img
                    className={classes["user-image"]}
                    src={`${config.apiDomain}/profileimages/${user.profileImage}`}
                    alt=""
                  />
                  <p className={classes.username}>{user.fullName}</p>
                  <p className={classes.email}>{user.email}</p>
                  <hr />
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
  return { user: state.user, notifications: state.notifications };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPushChat: (chat) => dispatch(pushChat(chat)),
    onPushNotification: (notification) => dispatch(pushNotification(notification)),
    onRemoveNotification: (notificationId) => dispatch(removeNotification(notificationId)),
    onSetNotificationSeen: () => dispatch(setNotificationSeen()),
   
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
