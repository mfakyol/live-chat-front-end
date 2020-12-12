import React, { Component } from "react";
import { connect } from "react-redux";
import { updateChatLastDate } from "../../../../redux/reducers/chatsReducer";
import { pushImages } from "../../../../redux/reducers/imagesReducer";
import { pushMessage } from "../../../../redux/reducers/messagesReducer";
import socket from "../../../../socket";
import Emojis from "./emojies/Emojis";
import classes from "./input-field.module.css";

class InputField extends Component {
  state = {
    emojisIsOpen: false,
    content: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.chatId !== this.props.chatId) {
      this.setState({
        emojisIsOpen: false,
      });
    }
  }

  openFileDialog() {
    document.getElementById("imageInput").click();
  }

  selectImages(e) {
    const images = Array.from(e.target.files).map((file) =>
      window.URL.createObjectURL(file)
    );
    this.props.onPushImages(images);
    e.target.value = null;
  }

  onChangeHandle(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  toggleEmojiContainer() {
    this.setState({
      emojisIsOpen: !this.state.emojisIsOpen,
    });
  }

  addEmojiToMessage(e) {
    if (e.target.localName === "span") {
      console.log("ok");
      this.setState({
        content: `${this.state.content}${e.target.innerText}`,
      });
    }
  }

  sendMessage(e) {
    const { onPushMessage, onUpdateChatLastDate } = this.props;
    this.setState({
      emojisIsOpen: false,
      content: "",
    });
    const { content } = this.state;
    if (content.trim() !== "") {
      const { chatId } = this.props;
      const messageData = {
        chatId,
        message: {
          type: 0,
          content,
        },
      };
      socket.emit("sendMessage", messageData, function (err, message) {
        if (!err) {
          onPushMessage(message);
          onUpdateChatLastDate(message.chatId, message.sentDate)
        }
      });
      document.querySelector('#content').focus()
    }
  }

  render() {
    const { content } = this.state;
    return (
      <div className={classes["input-field"]}>
        <button
          onClick={this.openFileDialog.bind(this)}
          className={classes["image-button"]}
        >
          <i className="far fa-image"></i>
        </button>
        <input
          id="imageInput"
          onChange={this.selectImages.bind(this)}
          onFocus={() => this.props.scrollToBottom()}
          style={{ display: "none" }}
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
          multiple
        />
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={this.onChangeHandle.bind(this)}
          className={classes.input}
          placeholder="Text here"
          type="text"
        />
        <button
          onClick={this.toggleEmojiContainer.bind(this)}
          className={classes["emoji-button"]}
        >
          <i className="far fa-laugh"></i>
        </button>
        <Emojis
          isOpen={this.state.emojisIsOpen}
          onClickHandle={this.addEmojiToMessage.bind(this)}
        />
        <button
          onClick={this.sendMessage.bind(this)}
          className={classes["send-button"]}
        >
          <i className="far fa-paper-plane"></i>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPushMessage: (message) => dispatch(pushMessage(message)),
    onPushImages: (images) => dispatch(pushImages(images)),
    onUpdateChatLastDate: (chatId, date) => dispatch(updateChatLastDate(chatId, date)),
  };
};

export default connect(null, mapDispatchToProps)(InputField);
