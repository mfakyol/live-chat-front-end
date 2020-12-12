import React, { Component } from "react";
import classes from "./my-profile.module.css";
import config from "../../../config";
import socket from "../../../socket";
import { connect } from "react-redux";
import { updateProfileImage } from "../../../redux/reducers/userReducer";

class MyProfile extends Component {
  state = {
    description: this.props.user.description
      ? this.props.user.description.toString()
      : "",
    isDescriptionEdit: false,
      newImage: undefined
  };

  closeMyProfile(e) {
    if (e.target.id === "background") {
      this.props.toggleMyProfile();
    }
  }

  editDescription(e) {
    this.setState({
      isDescriptionEdit: true,
    });
  }

  saveDescription(e) {
    //send server
    socket.emit('changeDescription', this.state.description, (err, status) => {
      if(!err){
        this.setState({
          isDescriptionEdit: false
        })
        console.log(this.state.description);
      }
    })
  }

  onChangeHandle(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  openFileDialog(e){
    document.querySelector('#image-input').click()
  }

  onImageInputChange(e) {
    socket.emit('changeProfileImage', {image:e.target.files[0],type: e.target.files[0].type.replace('image/', '')}, (err, profileImage) => {
      if(!err) {
        console.log(profileImage)
        this.props.onUpdateProfileImage(profileImage)
      }
    })
  }

  render() {
    const { toggleMyProfile, isOpen, user } = this.props;
    const { description, isDescriptionEdit } = this.state;

    return (
      <div
        id="background"
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
          
          <div onClick={this.openFileDialog.bind(this)} className={classes["user-image-container"]}>
          <input onChange={this.onImageInputChange.bind(this)} id="image-input" style={{display: "none"}} type="file"/>
            <img
              className={classes["user-image"]}
              src={`${config.apiDomain}/profileimages/${user.profileImage}`}
              alt=""
            />
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
            <p className={classes["description"]}>
              <span style={{ display: isDescriptionEdit ? "none" : "block" }}>
                {description ? description : "No context"}
              </span>
              <textarea
                value={description}
                onChange={this.onChangeHandle.bind(this)}
                style={{ display: isDescriptionEdit ? "block" : "none" }}
                type="text"
                name="description"
                autoComplete="off"
              />
            </p>
            <div className={classes.edit}>
              <i
                style={{ display: isDescriptionEdit ? "none" : "inline-block" }}
                onClick={this.editDescription.bind(this)}
                className="far fa-edit"
              ></i>
              <i
                onClick={this.saveDescription.bind(this)}
                style={{ display: isDescriptionEdit ? "inline-block" : "none" }}
                className="far fa-check-square"
              ></i>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateProfileImage: (profileImage) => dispatch(updateProfileImage(profileImage)),

  };
};

export default connect(null, mapDispatchToProps)(MyProfile);
