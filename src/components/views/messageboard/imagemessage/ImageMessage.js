import React, { Component } from "react";
import classes from "./image-message.module.css";
import config from "../../../../config";

export default class ImageMessage extends Component {
  openImage(e) {
    if (e.target.localName === "img") {
      console.log('dd')
      window.open(e.target.src, "_blank");
      return
    }
    window.open(e.target.children[0].src, "_blank");
   
  }

  render() {
    const { isLeft, message } = this.props;
    return (
      <div
        className={`${classes["image-message"]} ${
          isLeft
            ? classes["image-message-left"]
            : classes["image-message-right"]
        }`}
      >
        <div className={classes.images}>
          <p className={classes["title"]}>{message.content.title}</p>
          {message.content.images.length > 1
            ? message.content.images.map((image) => (
                <div onClick={this.openImage.bind(this)} key={image} className={classes["small-image-container"]}>
                  <img
                    className={classes["small-image"]}
                    src={`${
                      config.apiDomain
                    }/messages/getimage/${image}?token=${JSON.parse(
                      localStorage.getItem("token")
                    )}`}
                    alt=""
                  />
                </div>
              ))
            : message.content.images.map((image) => (
                <div onClick={this.openImage.bind(this)} key={image} className={classes["image-container"]}>
                  <img
                    className={classes["image"]}
                    src={`${
                      config.apiDomain
                    }/messages/getimage/${image}?token=${JSON.parse(
                      localStorage.getItem("token")
                    )}`}
                    alt=""
                  />
                </div>
              ))}
          <div className={classes["info"]}>
            <span className={classes.seenIcon}>
              {!isLeft && message.isSeen ? <i className="fas fa-eye"></i> : ""}
            </span>
            <span className={classes.time}>
              {new Date(Date.parse(message.sentDate))
                .toLocaleString()
                .slice(11, 16)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
