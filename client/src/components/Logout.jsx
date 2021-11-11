import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../App";
// import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  useEffect(() => {
    LogoutApp();
  }, []);
  const { dispatch } = useContext(UserContext);

  const history = useHistory();
  const LogoutApp = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "200") {
        dispatch({ type: "logout", payload: false });
        setIsLoading(false);
        history.push("/login", { replace: true });
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
        ""
      )}
    </>
  );
};

export default Logout;
