import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const registerUser = (event) => {
    event.preventDefault();
    if (firstName !== '' && lastName !== '' && userName !== '' && password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        setErrorMessage({
          registrationError: "Password and ConfirmPassword should exactly match",
        });
      } else {
        axios.post('http://localhost:8080/api/v1/signup', {
          firstName,
          lastName,
          userName,
          password
        }).then((response) => setSuccessMessage({
          message: `Registration is successful!! Your account number is ${response.data.accountNumber}`
        }));
        setErrorMessage({
          registrationError: ''
        })
        setIsSubmitted(true);
        setUserName('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setConfirmPassword('');
      }
    } else {
      setErrorMessage({
        registrationError: "All the fields are mandatory",
      });
    }
  }
  return (
    <div className="app-form-container">
      <h2>HDFCA Banking App</h2>
      <div className="app-form">
        <form onSubmit={registerUser}>
          {errorMessage && errorMessage.registrationError && (
            <p className="errorMessage">{errorMessage.registrationError}</p>
          )}
          {successMessage && successMessage.message && (
            <p className="successMessage">{successMessage.message}</p>
          )}
          <div className="app-form-details">
            <label htmlFor="firstName">
              <b>FirstName</b>
            </label>
            <input
              type="text"
              value={firstName}
              placeholder="Enter firstname"
              name="firstname"
              onChange={handleFirstName}
            ></input>

            <label htmlFor="lastName">
              <b>LastName</b>
            </label>
            <input
              type="text"
              value={lastName}
              placeholder="Enter Lastname"
              name="lastname"
              onChange={handleLastName}
            ></input>

            <label htmlFor="userName">
              <b>Username</b>
            </label>
            <input
              type="text"
              value={userName}
              placeholder="Enter UserName"
              name="userName"
              onChange={handleUserName}
            ></input>

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              name="psw"
              onChange={handlePassword}
            ></input>

            <label htmlFor="confirmpassword">
              <b>Confirm Password</b>
            </label>
            <input
              type="password"
              value={confirmPassword}
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

export default Signup;
