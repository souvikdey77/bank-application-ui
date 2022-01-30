import React, { useState , useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signInUser } from '../actions/action-creator';
import "../css/Form.scss";

const Signin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    signInError: '',
  });
  const dispatch = useDispatch();
  const handleSignIn = () => {
    if (userName === '' || password === '') {
      setErrorMessage({
        signInError: "All the fields are mandatory",
      });
    } else {
      //login
      dispatch(signInUser(userName, password))
      .then((response) => {
        if(response){
          this.history.push({
            pathname: `/home`,
            state: {token : response}
          })
        }else{
          setErrorMessage({
            signInError: 'Kindly check username or password!!'
          })
        }
      })
    }
  };

  const handleUsernameInput = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="app-form-container">
      <h2>HDFCA Banking App</h2>
      <div className="app-form">
        <form onSubmit={handleSignIn}>
          {errorMessage && errorMessage.signInError && (
            <p className="errorMessage">{errorMessage.signInError}</p>
          )}
          <div className="app-form-details">
            <label htmlFor="userName">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="userName"
              onChange={handleUsernameInput}
            ></input>

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handlePasswordInput}
            ></input>

            <button type="submit">Login</button>
            <Link to="/signup" className="btn">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect()(Signin);
