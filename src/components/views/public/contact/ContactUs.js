import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./contact-us.module.css";

export default class ContactUs extends Component {
  render() {
    return (
      <>
        <header className={classes.header}>
          <Link to="/" className={classes.brand}>
            <h1>
              Live Chat <span></span>
            </h1>
          </Link>
          <input type="checkbox" className={classes["menu-icon"]} />
          <span className={classes["hamburger"]}></span>

          <div className={classes["nav-items"]}>
            <Link className={classes["nav-item"]} to="/">
              Home
            </Link>
            <Link className={classes["nav-item"]} to="/about">
              About
            </Link>
            <Link className={classes["nav-item"]} to="/contactus">
              Contact Us
            </Link>
            <a
              className={classes["nav-item"]}
              href="https://github.com/mfakyol/live-chat-front-end"
            >
              Github
            </a>
          </div>
          <div className={classes["nav-items"]}>
            <a className={classes["sign-in"]} href="#form">
              Sign In
            </a>
            <Link className={classes["sign-up"]} to="/signup">
              Sign Up
            </Link>
          </div>
        </header>
      </>
    );
  }
}
