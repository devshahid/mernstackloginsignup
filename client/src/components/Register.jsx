import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import registerImage from "../images/loginform.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faPhone,
  faEnvelope,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
// import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Register = () => {
  const [post, setPost] = useState(false);

  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, profession, password, cpassword } = user;
    setPost(true);
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        profession,
        password,
        cpassword,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "422" || !data) {
      window.alert("Failed");
    } else {
      setPost(false);
      history.push("/login");
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
          <div className="signupContainer">
            <div className="signupformContainer">
              <h1>SignUp Form</h1>

              <form method="POST">
                <span>
                  <FontAwesomeIcon icon={faUser} style={{ margin: "0 10px" }} />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Enter your name"
                  />
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ margin: "0 10px" }}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Enter your email"
                  />
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ margin: "0 10px" }}
                  />
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Enter your number"
                  />
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faUserTie}
                    style={{ margin: "0 10px" }}
                  />
                  <input
                    type="text"
                    name="profession"
                    id="profession"
                    autoComplete="off"
                    value={user.profession}
                    onChange={handleInputs}
                    placeholder="Enter your profession"
                  />
                </span>
                <span>
                  <FontAwesomeIcon icon={faKey} style={{ margin: "0 10px" }} />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Enter your password"
                  />
                </span>
                <span>
                  <FontAwesomeIcon icon={faKey} style={{ margin: "0 10px" }} />
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm your password"
                  />
                </span>
                <input
                  type="submit"
                  onClick={postData}
                  name="signup"
                  id="signup"
                  value="Register"
                />
              </form>
            </div>
            <div className="signupimageContainer">
              <img
                src={registerImage}
                alt="Registeration"
                style={{
                  width: "350px",
                  height: "500px",
                }}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Register;
