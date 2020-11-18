import React, { Component } from "react";
import classes from "../../../helpers/styles/profile.module.css";
import userImage from "../../../helpers/img/user.png";

export default class Profile extends Component {
  render() {
    const { toggleProfile, isOpen } = this.props;
    return (
      <div style={{ display: isOpen ? "block" : "none" }} className={classes.background}>
        <div className={classes["profile-container"]}>
          <span onClick={null} className={classes["close-icon"]}>
            <i className="fas fa-times" onClick={() => toggleProfile()}></i>
          </span>
          <div className={classes["user-image-container"]}>
            <img className={classes["user-image"]} src={userImage} alt="" />
          </div>
          <hr className={classes["hr"]} />
          <div className={classes["info-container"]}>
            <div className={classes.info}>
              <i className="fas fa-user"></i>
            </div>
            <div className={classes["fullname"]}>Fatih Akyol</div>
          </div>
          <hr className={classes["hr"]} />
          <div className={classes["info-container"]}>
            <div className={classes.info}>
              <i className="fas fa-pen"></i>
            </div>
            <p className={classes["description"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              quo ratione enim porro molestiae optio!
            </p>
          </div>
          <hr className={classes["hr"]} />
        </div>
      </div>
    );
  }
}
