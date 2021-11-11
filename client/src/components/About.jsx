import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
// import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const About = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  useEffect(() => {
    callAboutPage();
  }, []);
  const history = useHistory();
  const callAboutPage = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "422") {
        history.push("/login");
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: "50%", textAlign: "center" }}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        <h1>Hello i am about us page</h1>
      )}
    </>
  );
};

export default About;
