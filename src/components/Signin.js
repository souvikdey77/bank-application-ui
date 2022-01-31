import axios from "axios";
import React, { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../css/Form.scss";

const Signin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    signInError: '',
  });
  const navigate = useNavigate();
  const handleSignIn = (event) => {
    event.preventDefault();
    if (userName !== '' && password !== '') {
      axios.post('http://localhost:8080/api/v1/signin',{
        userName,
        password
      }).then((response) => {
          setToken(response.data.jwtToken);
      })
      .catch((error) => {
        setErrorMessage({
          signInError: 'Invalid Credentials'
        })
      })
    } else {
      setErrorMessage({
        signInError: "All the fields are mandatory",
      });
    }
  };

  useEffect(() => {
    if(token){
      navigate('/home' , {
        state: {
          token : token,
          userName : userName
        }
      });
    }

  },[token])

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
              value={userName}
              placeholder="Enter Username"
              name="userName"
              onChange={handleUsernameInput}
            ></input>

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              value={password}
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

export default Signin;
