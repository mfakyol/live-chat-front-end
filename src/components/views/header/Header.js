import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "../../../helpers/styles/header.module.css";
import userImage from "../../../helpers/img/user.png";
import { withRouter } from 'react-router-dom';
import MyProfile from '../profile/MyProfile'


class Header extends Component {

  state = {
    myProfile: false
  }

  openAccountMenu(e) {
    const menu = e.target.nextSibling.nextSibling;
    if (menu.style.display !== "inline-block") {
      menu.style.display = "inline-block";
      const closeAccountMenu = (e) => {
        try {
          document.querySelector("#account-menu").style.display = "none";
          document.removeEventListener("click", closeAccountMenu);
        }
        catch(e){

        }
        }
      document.addEventListener("click", closeAccountMenu);
    }
  }

  toggleMyProfile(e) {
      this.setState({myProfile: !this.state.myProfile})
  }

  logOut(e) {
    localStorage.clear('token');
    this.props.history.push('/')
  }

  render() {
    return (
      <header className={classes.header}>
        <Link to="/" className={classes.brand}>
          <h1>
            Live Chat <span></span>
          </h1>
        </Link>
        <div className={classes.account}>
          <img
            onClick={this.openAccountMenu.bind(this)}
            className={classes["user-image"]}
            src={userImage}
            alt=""
          />
          <span className={classes.online}></span>
          <div id="account-menu" className={classes["account-menu"]}>
            <span className={classes["account-info"]}>
              <img className={classes["user-image"]} src={userImage} alt="" />
              <p className={classes.username}>Muhammed Fatih Akyol</p>
              <p className={classes.email}>muhammedfatihakyol@gmail.com</p>
              <p className={classes.phone}>Phone: 0553 938 38 41</p>
              <hr />
              <div className={classes["menu-items"]}>
                <span
                  onClick={this.toggleMyProfile.bind(this)}
                  className={classes["menu-item"]}
                >
                  {" "}
                  Profile
                </span>
                <span onClick={this.logOut.bind(this)} className={classes["menu-item"]}>
                  Log Out
                </span>
              </div>
            </span>
          </div>
        </div>
      <MyProfile  toggleMyProfile={this.toggleMyProfile.bind(this)} isOpen={this.state.myProfile}/>
      </header>
    );
  }
}

// const mapStateToProps = (state, props) => {
//   return { myProfile: state.myProfile };
// };

// const mapDispatchToProps = {
//   onUpdateMyProfile: updateMyProfile,
// };

export default withRouter(Header);
