import React, { useState, useContext } from "react";

import "../App.css";
import loginPage from "../images/loginpage.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { UserContext } from "../App";
import Box from "@mui/material/Box";
// import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [post, setPost] = useState(false);
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });
  const handleInputs = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    setPost(true);
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (!data || data.status === "422") {
      window.alert("Invalid Credentials");
    } else {
      setPost(false);
      dispatch({ type: "login", payload: true });
      history.push("/");
    }
  };
  return (
    <>
      <section className="registrationForm">
        {post ? (
          <Box sx={{ width: "50%", textAlign: "center" }}>
            <CircularProgress size={100} />
          </Box>
        ) : (
          <div className="loginContainer">
            <div className="signupimageContainer">
              <img
                src={loginPage}
                alt="Login"
                style={{
                  width: "350px",
                  height: "450px",
                }}
              />
            </div>
            <div className="loginformContainer">
              <h1>Login Form</h1>
              <form method="POST">
                <span>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ margin: "0 10px" }}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputs}
                    value={userData.email}
                    autoComplete="off"
                    placeholder="Enter your email"
                    required
                  />
                </span>
                <span>
                  <FontAwesomeIcon icon={faKey} style={{ margin: "0 10px" }} />
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputs}
                    value={userData.password}
                    id="password"
                    autoComplete="off"
                    placeholder="Enter your password"
                    required
                  />
                </span>

                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  onClick={sendData}
                  value="Login"
                />
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Login;
