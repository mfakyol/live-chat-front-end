import React, { Component } from "react";
import classes from "./my-profile.module.css";
import config from "../../../config";

class MyProfile extends Component {
  closeMyProfile(e) {
    if (e.target.id === "background") {
      this.props.toggleMyProfile();
    }
  }

  render() {
    const { toggleMyProfile, isOpen, user } = this.props;

    return (
      <div
        id="background"
        className={classes.background}
        style={{ display: isOpen ? "block" : "none" }}
        onClick={this.closeMyProfile.bind(this)}
      >
        <div className={classes["profile-container"]}>
          <span
            onClick={() => toggleMyProfile()}
            className={classes["close-icon"]}
          >
            <i className="fas fa-times"></i>
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
            <div className={classes.edit}>
              <i className="far fa-edit"></i>
            </div>
          </div>
          <hr className={classes["hr"]} />
          <div className={classes["info-container"]}>
            <div className={classes.info}>
              <i className="fas fa-pen"></i>
            </div>
            <p className={classes["description"]}>{user.description}</p>
            <div className={classes.edit}>
              <i className="far fa-edit"></i>
            </div>
          </div>
          <hr className={classes["hr"]} />
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state, props) => {
//   return { myProfile: state.myProfile };
// };

// const mapDispatchToProps = {
//   onUpdateMyProfile: updateMyProfile,
// };

export default MyProfile;
