import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./image-container.module.css";
import {
  clearImages,
  pushImages,
} from "../../../../../redux/reducers/imagesReducer";
import { sendImageMessage } from "../../../../../redux/reducers/messagesReducer";

class ImageContainer extends Component {
  state = {
    title: "",
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
    }
  }

  async sendImages() {
    const { title } = this.state;
    const { chatId } = this.props;
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
    this.props.onSendImageMessage(chatId, { title, images });
    this.props.onClearImages();
    this.setState({
      title: "",
    });
  }

  render() {
    const { images } = this.props;
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
                </div>
              );
            })}
          </div>
          <div className={classes["send-image-container"]}>
            <input
              name="title"
              value={this.state.title}
              onChange={this.onChangeHandle.bind(this)}
              className={classes["title"]}
              autoFocus
              type="text"
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
    onPushImages: (images) => dispatch(pushImages(images)),
    onSendImageMessage: (chatId, imageMessage) =>
      dispatch(sendImageMessage(chatId, imageMessage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageContainer);
