import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "../../../helpers/styles/message-board.module.css";
import userImage from "../../../helpers/img/user.png";
import InputField from "./InputField";
import Profile from '../profile/Profile'

class MessageBoard extends Component {
  state = {
    profileIsOpen: false
  }

  toggleProfile(e) {
    this.setState({
      profileIsOpen: !this.state.profileIsOpen
    })
  }

  render() {
    const {profileIsOpen} = this.state;
    return (
      <main className={classes.main}>
        <div className={classes["message-board"]}>
          <div className={classes["message-board-header"]}>
            <img src={userImage} alt="" />
            <span onClick={this.toggleProfile.bind(this)} className={classes.username}> Fatih Akyol</span>
            <span className={classes.status}> Offline</span>
            <i className="fas fa-times"></i>
            <Profile isOpen={profileIsOpen} toggleProfile={this.toggleProfile.bind(this)}/>
          </div>
          <div className={classes.messages}>
            <div className={`${classes["message"]} ${classes["message-left"]}`}>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                nisi dolor consequatur placeat debitis dolores impedit
                quibusdam, eligendi enim ducimus deleniti quasi tempora aliquid
                incidunt velit! Iure a facere voluptates. Impedit officiis sequi
                ullam iusto doloremque repellat, saepe maiores mollitia, dolor
                molestiae vero, suscipit repudiandae. Dolore porro voluptates
                officia, modi aspernatur, ducimus nesciunt dolores eligendi
                ipsum doloribus nostrum iure dignissimos. Beatae eaque provident
                veritatis iure quas nisi nam! Amet consequatur culpa possimus,
                sint suscipit rem adipisci nemo optio enim consectetur quis
                voluptatibus est error incidunt dolor! Repudiandae qui accusamus
                aspernatur! Nostrum unde excepturi esse minima corporis harum
                adipisci asperiores soluta laborum placeat ipsam a eum deleniti
                vel recusandae, dolorem laboriosam tempora dolorum iste eos!
                Minima laboriosam soluta in. Expedita, facilis.
                <br />
                <span className={classes.time}>14:00</span>
              </span>
            </div>
            <div
              className={`${classes["message"]} ${classes["message-right"]}`}
            >
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                nisi dolor consequatur placeat debitis dolores impedit
                quibusdam, eligendi enim ducimus deleniti quasi tempora aliquid
                incidunt velit! Iure a facere voluptates. Impedit officiis sequi
                ullam iusto doloremque repellat, saepe maiores mollitia, dolor
                molestiae vero, suscipit repudiandae. Dolore porro voluptates
                officia, modi aspernatur, ducimus nesciunt dolores eligendi
                ipsum doloribus nostrum iure dignissimos. Beatae eaque provident
                veritatis iure quas nisi nam! Amet consequatur culpa possimus,
                sint suscipit rem adipisci nemo optio enim consectetur quis
                voluptatibus est error incidunt dolor! Repudiandae qui accusamus
                aspernatur! Nostrum unde excepturi esse minima corporis harum
                adipisci asperiores soluta laborum placeat ipsam a eum deleniti
                vel recusandae, dolorem laboriosam tempora dolorum iste eos!
                Minima laboriosam soluta in. Expedita, facilis.
                <br />
                <span className={classes.time}>14:00</span>
              </span>
            </div>
            <div
              className={`${classes["message"]} ${classes["message-right"]}`}
            >
              <span>
                Lorem ipsum dolor sit amet.
                <br />
                <span className={classes.time}>14:00</span>
              </span>
            </div>
            <div className={`${classes["message"]} ${classes["message-left"]}`}>
              <span>
                Lorem ipsum dolor sit amet.
                <br />
                <span className={classes.time}>14:00</span>
              </span>
            </div>
            <div
              className={`${classes["message"]} ${classes["message-right"]}`}
            >
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                nisi dolor consequatur placeat debitis dolores impedit
                quibusdam, eligendi enim ducimus deleniti quasi tempora aliquid
                incidunt velit! Iure a facere voluptates. Impedit officiis sequi
                ullam iusto doloremque repellat, saepe maiores mollitia, dolor
                molestiae vero, suscipit repudiandae. Dolore porro voluptates
                officia, modi aspernatur, ducimus nesciunt dolores eligendi
                ipsum doloribus nostrum iure dignissimos. Beatae eaque provident
                veritatis iure quas nisi nam! Amet consequatur culpa possimus,
                sint suscipit rem adipisci nemo optio enim consectetur quis
                voluptatibus est error incidunt dolor! Repudiandae qui accusamus
                aspernatur! Nostrum unde excepturi esse minima corporis harum
                adipisci asperiores soluta laborum placeat ipsam a eum deleniti
                vel recusandae, dolorem laboriosam tempora dolorum iste eos!
                Minima laboriosam soluta in. Expedita, facilis.
                <br />
                <span className={classes.time}>14:00</span>
              </span>
            </div>
            <div
              className={`${classes["message"]} ${classes["message-right"]}`}
            >
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                nisi dolor consequatur placeat debitis dolores impedit
                quibusdam, eligendi enim ducimus deleniti quasi tempora aliquid
                incidunt velit! Iure a facere voluptates. Impedit officiis sequi
                ullam iusto doloremque repellat, saepe maiores mollitia, dolor
                <br />
                <span className={classes.time}>14:00</span>
              </span>
            </div>
            <div className={`${classes["message"]} ${classes["message-left"]}`}>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                nisi dolor consequatur placeat debitis dolores impedit
                quibusdam, eligendi enim ducimus deleniti quasi tempora aliquid
                incidunt velit! Iure a facere voluptates. Impedit officiis sequi
                ullam iusto doloremque repellat, saepe maiores mollitia, dolor
                <br />
                <span className={classes.time}>14:00</span>
              </span>
            </div>
          </div>
        </div>
        <InputField />
      </main>
    );
  }
}
/*
const mapStateToProps = (state, props) => {
  //return { example: state.example };
};

const mapDispatchToProps = {
  // onGetExample: getExample,
};
*/

export default connect(null, null)(MessageBoard);
