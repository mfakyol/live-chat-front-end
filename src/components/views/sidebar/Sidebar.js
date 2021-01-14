import React, { Component } from "react";
import classes from "./sidebar.module.css";
import ChatListItem from "./ChatListItem";
import { getChats, pushChat } from "../../../redux/reducers/chatsReducer";
import { connect } from "react-redux";
import socket from "../../../socket";
import config from "../../../config";
import LoadingSpinner from '../../common/LoadingSpinner'

class Sidebar extends Component {
  state = {
    isMobile: false,
    isOpen: true,
    filter: "",
    isAddChatOpen: false,
    searchInput: "",
    user: null,
    err: "",
  };

  componentDidMount() {
    if (window.innerWidth < 800) {
      this.setState({ isMobile: true });
    }
    window.addEventListener("resize", (e) => {
      if (window.innerWidth < 800 && !this.state.isMobile) {
        this.setState({ isMobile: true, isAddChatOpen: false });
      } else if (window.innerWidth > 800 && this.state.isMobile) {
        this.setState({ isMobile: false });
      }
    });
    socket.on("newChat", chat => {
      this.props.onpushChat(chat)
    })
  }

  closeSidebar(e) {
    const sidebar = document.querySelector("#sidebar");
    sidebar.style.transform = "translateX(-300px)";
    sidebar.style.transform = "translateX(-300px)";
    this.setState({
      isOpen: false,
      isAddChatOpen: false,
      searchInput: "",
      user: null,
    });
  }
  closeSidebarEvent() {
    this.setState({
      isOpen: false,
      isAddChatOpen: false,
      searchInput: "",
      user: null,
    });
  }

  toggleAddChat(e) {
    this.setState({
      isAddChatOpen: !this.state.isAddChatOpen,
      searchInput: "",
      user: null,
      err: ""
    });
    return false;
  }

  search(e) {
    const { searchInput } = this.state;
    this.setState({
      err: "",
      user: null,
    });
    if (searchInput.trim() !== "") {
      socket.emit("searchUser", searchInput, (err, user) => {
        if (!err) {
          this.setState({
            user,
          });
        } else {
          this.setState({
            err,
          });
        }
      });
    }
  }

  addUser(userId, e) {
    console.log(userId);
    socket.emit("sendRequest", userId, (err, status) => {
      if (!err) {
        this.setState({
          user: { ...this.state.user, status },
        });
        console.log(status);
      } else {
        this.setState({
          err,
        });
      }
    });
  }

  onChangeHandle(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const {
      isMobile,
      isOpen,
      filter,
      isAddChatOpen,
      searchInput,
      user,
      err,
    } = this.state;
    const { chats, isChatsLoading } = this.props;
    return (
      <>
        <div
          style={{ display: isMobile && isOpen ? "block" : "none" }}
          onClick={this.closeSidebar.bind(this)}
          className={classes.background}
        ></div>
        <span className={classes["toggle-bar"]}>
          <i
            style={{ display: isMobile && !isOpen ? "block" : "none" }}
            onClick={() => this.setState({ isOpen: true })}
            className="fas fa-arrow-circle-right"
          ></i>
        </span>
        <div
          id="sidebar"
          style={{ transform: isMobile && isOpen ? "translate(0)" : "" }}
          className={classes.sidebar}
        >
          <LoadingSpinner status={isChatsLoading}/>
          <div className={classes["sidebar-header"]}>
            <b>CHATS</b>
            <span onClick={this.toggleAddChat.bind(this)}>
              <i className="fas fa-plus"></i> Add User
            </span>
            <i
              style={{ display: isMobile ? "block" : "none" }}
              onClick={this.closeSidebar.bind(this)}
              className="fas fa-times"
            ></i>
            <hr />
            <input
              className={classes["filter-input"]}
              type="text"
              name="filter"
              value={filter}
              onChange={this.onChangeHandle.bind(this)}
              placeholder="filter by name"
            />
          </div>

          <div className={classes["chats"]}>
            {chats
              .filter((chat) =>
                chat.user.fullName
                  .toLowerCase()
                  .includes(filter.toLocaleLowerCase())
              )
              .map((chat) => {
                return (
                  <ChatListItem
                    closeSidebar={this.closeSidebarEvent.bind(this)}
                    key={chat._id}
                    chat={chat}
                  />
                );
              })}
          </div>
          <div
            style={{ display: isAddChatOpen ? "block" : "none" }}
            className={classes["add-chat-container"]}
          >
            <input
              onChange={this.onChangeHandle.bind(this)}
              className={classes["search-user-input"]}
              type="text"
              name="searchInput"
              value={searchInput}
              placeholder="user id"
            />
            <button
              onClick={this.search.bind(this)}
              className={classes["search-user-button"]}
            >
              Search
            </button>
            <hr />
            {err ? <p className={classes["err"]}>{err}</p> : ""}
            {user ? (
              <div className={classes["search-result"]}>
                <img
                  src={`${config.apiDomain}/profileImages/${user.profileImage}`}
                  alt=""
                />
                <span title={user.fullName}>{user.fullName}</span>
                {user.status ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <i
                    onClick={this.addUser.bind(this, user._id)}
                    className="fas fa-plus"
                  ></i>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={classes["add-chat-background"]}></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { chats: state.chats, isChatsLoading: state.isChatsLoading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetChats: () => dispatch(getChats()),
    onpushChat: (chat) => dispatch(pushChat(chat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
