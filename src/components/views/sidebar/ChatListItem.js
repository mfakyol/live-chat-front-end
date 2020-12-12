import React, { Component } from "react";
import classes from "./sidebar.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getUnreads } from "../../../redux/reducers/unreadsReducer";
import config from "../../../config";

class ChatListItem extends Component {
  componentDidMount() {
    const { chat } = this.props;
    this.props.onGetUnreads(chat._id, chat.user._id);
  }

  render() {
    const { chat, unReads } = this.props;
    return (
      <NavLink
      onClick={() => this.props.closeSidebar()}
        className={classes.chat}
        activeClassName={classes["active"]}
        to={`/chat/${chat._id}`}
      >
        <img
          src={`${config.apiDomain}/profileimages/${chat.user.profileImage}`}
          alt=""
        />
        <span className={classes.username}>{chat.user.fullName}</span>

        <i style={{display: unReads[chat._id] ? "block": "none"}} className="fas fa-comment">
          <span>{unReads[chat._id]}</span>
        </i>
      </NavLink>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { unReads: state.unReads };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUnreads: (chatId, senderId) => dispatch(getUnreads(chatId, senderId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatListItem);
