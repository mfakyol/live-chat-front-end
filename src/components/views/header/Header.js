import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import { withRouter } from "react-router-dom";
import MyProfile from "../profile/MyProfile";
import { connect } from "react-redux";
import config from "../../../config";

class Header extends Component {
  state = {
    myProfile: false,
  };

  openAccountMenu(e) {
    const menu = e.target.nextSibling.nextSibling;
    if (menu.style.display !== "inline-block") {
      menu.style.display = "inline-block";
      const closeAccountMenu = (e) => {
        try {
          document.querySelector("#account-menu").style.display = "none";
          document.removeEventListener("click", closeAccountMenu);
        } catch (e) {}
      };
      document.addEventListener("click", closeAccountMenu);
    }
  }

  toggleMyProfile(e) {
    this.setState({ myProfile: !this.state.myProfile });
  }

  logOut(e) {
    localStorage.clear("token");
    this.props.history.push("/");
  }

  render() {
    const { user } = this.props;
    return (
      <header className={classes.header}>
        <Link to="/" className={classes.brand}>
          <h1>
            Live Chat <span></span>
          </h1>
        </Link>
        {user.profileImage ? (
          <>
            {" "}
            <div className={classes.account}>
              <img
                onClick={this.openAccountMenu.bind(this)}
                className={classes["user-image"]}
                src={`${config.apiDomain}/profileimages/${user.profileImage}`}
                alt=""
              />
              <span className={classes.online}></span>
              <div id="account-menu" className={classes["account-menu"]}>
                <span className={classes["account-info"]}>
                  <img
                    className={classes["user-image"]}
                    src={`${config.apiDomain}/profileimages/${user.profileImage}`}
                    alt=""
                  />
                  <p className={classes.username}>{user.fullName}</p>
                  <p className={classes.email}>{user.email}</p>
                  <hr />
                  <div className={classes["menu-items"]}>
                    <span
                      onClick={this.toggleMyProfile.bind(this)}
                      className={classes["menu-item"]}
                    >
                      {" "}
                      Profile
                    </span>
                    <span
                      onClick={this.logOut.bind(this)}
                      className={classes["menu-item"]}
                    >
                      Log Out
                    </span>
                  </div>
                </span>
              </div>
            </div>
            <MyProfile
              user={user}
              toggleMyProfile={this.toggleMyProfile.bind(this)}
              isOpen={this.state.myProfile}
            />
          </>
        ) : null}
      </header>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { user: state.user };
};

// const mapDispatchToProps = {
//   onUpdateMyProfile: updateMyProfile,
// };

export default connect(mapStateToProps, null)(withRouter(Header));
