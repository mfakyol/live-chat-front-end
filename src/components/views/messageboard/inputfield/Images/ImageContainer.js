import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./image-container.module.css";
import {
  clearImages,
  pushImages,
  removeImage,
} from "../../../../../redux/reducers/imagesReducer";
import { pushMessage } from "../../../../../redux/reducers/messagesReducer";
import { updateChatLastDate } from "../../../../../redux/reducers/chatsReducer";
import socket from "../../../../../socket";


class ImageContainer extends Component {
  state = {
    title: "",
    newImages: [],
  };

  onChangeHandle(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  close(e) {
    if (e.target.id === "background") {
      e.target.style.display = "none";
      this.props.onClearImages();
      this.setState({
        title: ''
      })
    }
  }

  openNewImageInput(e) {
    document.getElementById("addImageInput").click();
  }

  addNewImages(e) {
    const newImages = Array.from(e.target.files).map((file) =>
      window.URL.createObjectURL(file)
    );
    this.props.onPushImages(newImages);
  }

  removeImage(index, e) {
    this.props.onRemoveImage(index);
  }

  async sendImages() {
    const { title } = this.state;
    const { chatId, onPushMessage, onUpdateChatLastDate } = this.props;
    let images = [];
    await Promise.all(
      this.props.images.map(async (imageLink) => {
        await fetch(imageLink)
          .then((res) => res.blob())
          .then((blob) =>
            images.push({ image: blob, type: blob.type.replace("image/", "") })
          )
          .catch((err) => console.log(err));
      })
    );
    socket.emit("sendImageMessage", chatId, { title, images }, function (err, message) {
      if (!err) {
        onPushMessage(message);
        onUpdateChatLastDate(chatId, message.sentDate)
      }
    });

    
    this.props.onClearImages();
    this.setState({
      title: "",
    });
  }

  render() {
    const { images } = this.props;
    const { newImages } = this.state;
    return (
      <div
        style={{ display: images.length ? "block" : "none" }}
        id="background"
        onClick={this.close.bind(this)}
        className={classes["background"]}
      >
        <div className={classes["container"]}>
          <div className={classes["images"]}>
            {images.map((image, index) => {
              return (
                <div
                  id={index}
                  key={index}
                  className={classes["image-container"]}
                >
                  <img src={image} alt="" />
                  <div
                    onClick={this.removeImage.bind(this, index)}
                    className={classes["delete-container"]}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </div>
                </div>
              );
            })}
            <div
              onClick={this.openNewImageInput.bind(this)}
              className={classes["new-image-container"]}
            >
              <i className="fas fa-plus"></i>
            </div>
            <input
              style={{ display: "none" }}
              type="file"
              value={newImages}
              onChange={this.addNewImages.bind(this)}
              id="addImageInput"
              accept="image/x-png,image/gif,image/jpeg"
              multiple
            />
          </div>
          <div className={classes["send-image-container"]}>
            <input
              name="title"
              value={this.state.title}
              onChange={this.onChangeHandle.bind(this)}
              className={classes["title"]}
              autoFocus
              type="text"
              placeholder="Text here"
              autoComplete="off"
            />
            <button
              onClick={this.sendImages.bind(this)}
              className={classes["send-images-button"]}
            >
              <i className="far fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { images: state.images };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearImages: () => dispatch(clearImages()),
    onRemoveImage: (index) => dispatch(removeImage(index)),
    onPushImages: (images) => dispatch(pushImages(images)),
    onPushMessage: (message) => dispatch(pushMessage(message)),
    onUpdateChatLastDate: (chatId, date) => dispatch(updateChatLastDate(chatId, date)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageContainer);
