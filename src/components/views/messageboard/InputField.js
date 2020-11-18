import React, { Component } from "react";
import classes from "../../../helpers/styles/input-field.module.css";

export default class InputField extends Component {
  render() {
    return (
      <div className={classes["input-field"]}>
        <button className={classes.button}>
          <i className="far fa-image"></i>
        </button>
        <textarea className={classes.input} type="text" name="" id="" />
        <button className={classes.button}>
          <i className="far fa-laugh"></i>
        </button>
        <button className={classes.button}>
        <i className="far fa-paper-plane"></i>
        </button>
      </div>
    );
  }
}
