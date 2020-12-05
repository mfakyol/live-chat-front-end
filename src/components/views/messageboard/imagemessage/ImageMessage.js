import React, { Component } from "react";
import classes from "./image-message.module.css";
import config from "../../../../config";

export default class ImageMessage extends Component {
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
          {message.content.images.length > 2
            ? message.content.images.map((image) => (
                <div key={image} className={classes["small-image-container"]}>
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
                <img
                  key={image}
                  className={classes["image"]}
                  src={`${
                    config.apiDomain
                  }/messages/getimage/${image}?token=${JSON.parse(
                    localStorage.getItem("token")
                  )}`}
                  alt=""
                />
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
