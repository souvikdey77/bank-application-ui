import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signUpUser } from '../actions/action-creator';
import "../css/Form.scss";

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    registrationError: '',
  });
  const [successMessage, setSuccessMessage] = useState({
    message : ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleUserName = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const registerUser = (event) => {
    event.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      userName === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setErrorMessage({
        registrationError: "All the fields are mandatory",
      });
    } else if (password !== confirmPassword) {
      setErrorMessage({
        registrationError: "Password and ConfirmPassword should exactly match",
      });
    } else {
      setIsSubmitted(true);
      dispatch(signUpUser(firstName,lastName,userName,password))
      .then((response) => {
        if(response){
          setSuccessMessage({
            message : 'Registration Successful!!'
          })
        }else{
          setErrorMessage({
            registrationError: 'Please validate the inputs!!'
          })
        }
      })
    }
  };

  return (
    <div className="app-form-container">
      <h2>HDFCA Banking App</h2>
      <div className="app-form">
        <form onSubmit={registerUser}>
          {errorMessage && errorMessage.registrationError && (
            <p className="errorMessage">{errorMessage.registrationError}</p>
          )}
          <div className="app-form-details">
            <label htmlFor="firstName">
              <b>FirstName</b>
            </label>
            <input
              type="text"
              placeholder="Enter firstname"
              name="firstname"
              onChange={handleFirstName}
            ></input>

            <label htmlFor="lastName">
              <b>LastName</b>
            </label>
            <input
              type="text"
              placeholder="Enter Lastname"
              name="lastname"
              onChange={handleLastName}
            ></input>

            <label htmlFor="email">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter UserName"
              name="userName"
              onChange={handleUserName}
            ></input>

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              onChange={handlePassword}
            ></input>

            <label htmlFor="confirmpassword">
              <b>Confirm Password</b>
            </label>
            <input
              type="password"
              placeholder="Re Enter Password"
              name="confirm password"
              onChange={handleConfirmPassword}
            ></input>
            <button type="submit">SignUp</button>
            <Link to="/" className="btn">
              Signin
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect()(Signup);
