import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "../../../helpers/styles/home.module.css";
import config from "../../../config";

export default class Home extends Component {
  state = {
    email: "",
    password: "",
    err: "",
  };
  signin = (e) => {
    this.setState({ err: "" });
    e.preventDefault();
    const { email, password } = this.state;
    let user = {
      email,
      password,
    };
    Axios.get(`${config.apiDomain}/auth`, { params: user })
      .then((res) => res.data)
      .then(({ status, message, token }) => {
        if (status) {
          localStorage.setItem("token", JSON.stringify(token));
        } else {
          this.setState({
            err: message,
            password: "",
          });
        }
      });
    //fetch
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, err } = this.state;

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
        <main className={classes["main"]}>
          <section className={classes["section-a"]}>
            <h2 className={classes.slogan}>
              Text with your friends{" "}
              <span role="img" aria-label="emote">
                😎
              </span>
              , family
              <span role="img" aria-label="emote">
                👪
              </span>
              , colleagues
              <span role="img" aria-label="emote">
                🤓
              </span>
              .
            </h2>
            <Link className={classes["join-button"]} to="/signup">
              Join Them Now
            </Link>
            <form
              id="form"
              className={classes.form}
              onSubmit={this.signin.bind(this)}
            >
              <h3>Sign In</h3>
              <hr />

              <span
                style={{ opacity: err ? "1" : "0" }}
                className={classes.err}
              >
                <p>
                  {err} <i onClick={(e) => this.setState({ err: "" })} className="fas fa-times"></i>
                </p>
              </span>

              <div className={classes["form-group"]}>
                <span>E-mail</span>
                <input
                  className={classes["form-control"]}
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange.bind(this)}
                />
              </div>

              <div className={classes["form-group"]}>
                <span>Password</span>
                <input
                  className={classes["form-control"]}
                  autoComplete="off"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className={classes["form-group"]}>
                <button>Sign In</button>
              </div>
            </form>
          </section>
          <section className={classes["section-c"]}>
            <div className={classes.block}>
              <p className={classes.question}>
                What is{" "}
                <span role="img" aria-label="emote">
                  {" "}
                  Live Chat 🙃{" "}
                </span>
                ?
              </p>
              <p className={classes.answer}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
                libero cumque esse repudiandae amet, pariatur consequuntur a
                ipsa veritatis, eveniet laborum incidunt non, magnam expedita
                cupiditate quaerat dolores temporibus velit. Ullam unde in,
                culpa deleniti asperiores amet tenetur sapiente omnis totam aut
                quisquam. Sequi blanditiis dicta unde debitis, at voluptatem
                officia, excepturi enim, cum perspiciatis porro sint atque
                magni. Expedita! Expedita eaque, hic soluta facilis ducimus nemo
                asperiores impedit voluptatum a sequi neque suscipit non? Eum
                fuga est recusandae eveniet optio sapiente nihil. Illo est
                quidem dolore ea, aut inventore. Numquam minima, provident
                mollitia, sapiente ipsum suscipit neque veritatis distinctio
                obcaecati laborum iusto incidunt officia ut dolores nesciunt
                minus quis voluptates? Recusandae est accusantium repudiandae id
                iure tenetur provident animi! Neque dignissimos aliquid ullam
                rerum et voluptatum perferendis, iusto modi libero facilis
                voluptates quis. Veritatis quo quam molestiae molestias
                repellendus expedita! Cupiditate dicta itaque quas sit doloribus
                atque autem delectus.
              </p>
            </div>
            <div className={classes.block}>
              <p className={classes.question}>
                Why is{" "}
                <span role="img" aria-label="emote">
                  {" "}
                  Live Chat 🙃{" "}
                </span>
                ?
              </p>
              <p className={classes.answer}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
                libero cumque esse repudiandae amet, pariatur consequuntur a
                ipsa veritatis, eveniet laborum incidunt non, magnam expedita
                cupiditate quaerat dolores temporibus velit. Ullam unde in,
                culpa deleniti asperiores amet tenetur sapiente omnis totam aut
                quisquam. Sequi blanditiis dicta unde debitis, at voluptatem
                officia, excepturi enim, cum perspiciatis porro sint atque
                magni. Expedita! Expedita eaque, hic soluta facilis ducimus nemo
                asperiores impedit voluptatum a sequi neque suscipit non? Eum
                fuga est recusandae eveniet optio sapiente nihil. Illo est
                quidem dolore ea, aut inventore. Numquam minima, provident
                mollitia, sapiente ipsum suscipit neque veritatis distinctio
                obcaecati laborum iusto incidunt officia ut dolores nesciunt
                minus quis voluptates? Recusandae est accusantium repudiandae id
                iure tenetur provident animi! Neque dignissimos aliquid ullam
                rerum et voluptatum perferendis, iusto modi libero facilis
                voluptates quis. Veritatis quo quam molestiae molestias
                repellendus expedita! Cupiditate dicta itaque quas sit doloribus
                atque autem delectus.
              </p>
            </div>
          </section>
        </main>
        <footer className={classes.footer}></footer>
      </>
    );
  }
}
