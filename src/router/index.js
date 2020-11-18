import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MessageBoard from "../components/views/messageboard/MessageBoard";
//Instructor
import Main from "../components/layouts/Main";
import Header from "../components/views/header/Header";
import Sidebar from "../components/views/sidebar/Sidebar";
import Home from "../components/views/public/Home";
import Signup from "../components/views/public/Signup";
import About from "../components/views/public/About";
import ContactUs from "../components/views/public/ContactUs";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/about" exact component={About} />
        <Route path="/contactus" exact component={ContactUs} />
      </Switch>
      <Switch>
        <Route path="/chat/:path?" /* <----- admin/:path? */>
          <Main>
            <Header />
            <Sidebar />
            <Switch>
              <Route path="/chat/:id" exact component={MessageBoard} />
            </Switch>
          </Main>
        </Route>
      </Switch>
    </Router>
  );
};
