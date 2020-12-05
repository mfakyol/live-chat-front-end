import React, { Component } from "react";
import classes from "./text-message.module.css";

export default class TextMessage extends Component {
  render() {
    const { isLeft, message } = this.props;
    return (
      <div
        className={`${classes["message"]} ${
          isLeft ? classes["message-left"] : classes["message-right"]
        }`}
      >
        <span className={classes.content}>
          {message.content} 
          <br />
          <div className = {classes.info}>
          <span className={classes.seenIcon}>
            {!isLeft && message.isSeen ?  (
              <>
                {" "}
                <i className="fas fa-eye"></i>{" "}
              </>
            ): ""}
          </span>
          <span className={classes.time}>
            {new Date(Date.parse(message.sentDate))
              .toLocaleString()
              .slice(11, 16)}
          </span>
          </div>
        </span>
      </div>
    );
  }
}
