import React, { Component } from "react";
import classes from "../../../helpers/styles/my-profile.module.css";
import userImage from "../../../helpers/img/user.png";

class MyProfile extends Component {
  componentDidMount() {}
  render() {
    const { toggleMyProfile, isOpen } = this.props;

    return (
      <div
        className={classes.background}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className={classes["profile-container"]}>
          <span
            onClick={() => toggleMyProfile()}
            className={classes["close-icon"]}
          >
            <i className="fas fa-times"></i>
          </span>
          <div className={classes["user-image-container"]}>
            <img className={classes["user-image"]} src={userImage} alt="" />
          </div>
          <hr className={classes["hr"]} />
          <div className={classes["info-container"]}>
            <div className={classes.info}>
              <i className="fas fa-user"></i>
            </div>
            <div className={classes["fullname"]}>Muhammed Fatih Akyol</div>
            <div className={classes.edit}>
              <i className="far fa-edit"></i>
            </div>
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
