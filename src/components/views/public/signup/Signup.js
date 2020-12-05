import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./signup.module.css";
import config from "../../../../config";
import Axios from "axios";

export default class Signup extends Component {
  state = {
    page: 0,
    email: "",
    fullName: "",
    password: "",
    activationCode: "",
    err: "",
  };

  signupPage = () => {
    const { email, fullName, password, err } = this.state;
    return (
      <form
        id="form"
        className={classes.form}
        onSubmit={this.signup.bind(this)}
      >
        <h3>Sign Up</h3>
        <hr />

        <span
          style={{ display: err ? "block" : "none" }}
          className={classes.err}
        >
          <p>
            {err} <i onClick={(e) => this.setState({ err: "" })} className="fas fa-times"></i>
          </p>
        </span>

        <div className={classes["form-group"]}>
          <span>E-mail</span>
          <input
            name="email"
            value={email}
            onChange={this.handleChange.bind(this)}
            className={classes["form-control"]}
            type="text"
          />
        </div>

        <div className={classes["form-group"]}>
          <span>Full Name</span>
          <input
            name="fullName"
            value={fullName}
            onChange={this.handleChange.bind(this)}
            className={classes["form-control"]}
            type="text"
          />
        </div>
        <div className={classes["form-group"]}>
          <span>Password</span>
          <input
            autoComplete="off"
            name="password"
            value={password}
            onChange={this.handleChange.bind(this)}
            className={classes["form-control"]}
            type="password"
          />
        </div>
        <div className={classes["form-group"]}>
          <button>Sign In</button>
        </div>
      </form>
    );
  };

  activationPage = () => {
    const { activationCode, err, info } = this.state;
    return (
      <form
        id="form"
        className={classes.form}
        onSubmit={this.activateAccount.bind(this)}
      >
        <h3>Activate Account</h3>
        <hr />

        <span
          style={{ display: info ? "block" : "none" }}
          className={classes.info}
        >
          <p>
            {info} <i  onClick={(e) => this.setState({ info: "" })} className="fas fa-times"></i>
          </p>

        </span>
        <span
          style={{ display: err ? "block" : "none" }}
          className={classes.err}
        >
          <p>
            {err} <i onClick={(e) => this.setState({ err: "" })} className="fas fa-times"></i>
          </p>
        </span>

        <div className={classes["form-group"]}>
          <span>Activation Code</span>
          <input
            className={classes["form-control"]}
            name="activationCode"
            value={activationCode}
            onChange={this.handleChange.bind(this)}
            type="text"
          />
        </div>
        <div className={classes["form-group"]}>
          <button>Acivate</button>
        </div>
      </form>
    );
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  signup = (e) => {
    e.preventDefault();
    const { email, fullName, password } = this.state;
    const user = {
      email,
      fullName,
      password,
    };

    Axios.post(`${config.apiDomain}/auth`, user)
      .then((res) => res.data)
      .then(({ status, message }) => {
        if (status) {
          this.setState({
            info: message,
            page: 1,
            err: ''
          });
        } else {
          this.setState({
            err: message,
          });
        }
      })
      .catch((err) => {
        this.setState({
          err: "Server error.",
        });
      });
  };

  activateAccount = (e) => {
    e.preventDefault();
    const { email, activationCode } = this.state;
    const activation = {
      email,
      activationCode,
    };
    Axios.put(`${config.apiDomain}/auth`, activation)
    .then(res => res.data)
    .then(({status, message}) => {
      if(status){
        this.setState({
          info: message
        })
      }
      else {
        this.setState({
          err: message
        })
      }
    })
  };

  render() {
    const { page } = this.state;
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
            <a className={classes["sign-in"]} href="/#form">
              Sign In
            </a>
            <Link className={classes["sign-up"]} to="/signup">
              Sign Up
            </Link>
          </div>
        </header>
        <main className={classes.main}>
          {page === 0 ? this.signupPage() : this.activationPage()}
        </main>
      </>
    );
  }
}
