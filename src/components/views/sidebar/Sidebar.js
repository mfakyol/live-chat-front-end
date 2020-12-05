import React, { Component } from "react";
import classes from "./sidebar.module.css";
import ChatListItem from "./ChatListItem";
import { getChats } from "../../../redux/reducers/chatsReducer";
import { connect } from "react-redux";

class Sidebar extends Component {
  componentDidMount() {
    if (window.innerWidth < 600) {
      this.setState({ isMobile: true });
    }
    window.addEventListener("resize", (e) => {
      if (window.innerWidth < 600 && !this.state.isMobile) {
        this.setState({ isMobile: true });
      } else if (window.innerWidth > 600 && this.state.isMobile) {
        this.setState({ isMobile: false });
      }
    });
  }

  state = {
    isMobile: false,
    isOpen: false,
  };

  closeSidebar(e) {
    const sidebar = document.querySelector("#sidebar");
    sidebar.style.transform = "translateX(-300px)";
    sidebar.style.transform = "translateX(-300px)";
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const { isMobile, isOpen } = this.state;
    const { chats } = this.props;
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
          <span className={classes["sidebar-header"]}>
            CHATS{" "}
            <i
              style={{ display: isMobile ? "block" : "none" }}
              onClick={this.closeSidebar.bind(this)}
              className="fas fa-times"
            ></i>
          </span>
          <ul className={classes.chats}>
            {chats.map((chat) => {
              return <ChatListItem  key={chat._id} chat={chat} />;
            })}
          </ul>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { chats: state.chats };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetChats: () => dispatch(getChats()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
