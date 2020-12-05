import React, { Component } from "react";
import classes from "./profile.module.css";
import config from "../../../config";

export default class Profile extends Component {
  componentDidMount() {
    //will connect socket
  }

  render() {
    const { toggleProfile, isOpen, user } = this.props;
    return (
      <div
        style={{ display: isOpen ? "block" : "none" }}
        className={classes.background}
      >
        <div className={classes["profile-container"]}>
          <span onClick={null} className={classes["close-icon"]}>
            <i className="fas fa-times" onClick={() => toggleProfile()}></i>
          </span>
          <div className={classes["user-image-container"]}>
            <img className={classes["user-image"]} src={`${config.apiDomain}/profileimages/${user.profileImage}`} alt="" />
          </div>
          <hr className={classes["hr"]} />
          <div className={classes["info-container"]}>
            <div className={classes.info}>
              <i className="fas fa-user"></i>
            </div>
            <div className={classes["fullname"]}>{user.fullName}</div>
          </div>
          <hr className={classes["hr"]} />
          <div className={classes["info-container"]}>
            <div className={classes.info}>
              <i className="fas fa-pen"></i>
            </div>
            <p className={classes["description"]}>{user.description}</p>
          </div>
          <hr className={classes["hr"]} />
        </div>
      </div>
    );
  }
}
