import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Add from "./components/Add";
import List from "./components/List";
import Tutorial from "./components/Tutorial";

import Login from "./components/Login";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import Register from "./components/Register";


function App() {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();



  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          INFOTECH
        </a>
        {/* <div className="navbar-nav mr-auto">
      
        </div> */}

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>

            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </div>
        )}

      </nav>



      <div className="container mt-3">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/tutorials" component={List} />
          <Route exact path="/add" component={Add} />
          <Route path="/tutorials/:id" component={Tutorial} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
