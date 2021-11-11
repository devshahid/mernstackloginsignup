// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";

import { Route, Switch } from "react-router-dom";
import Logout from "./components/Logout";
import { createContext, useReducer } from "react";
import { reducerFunction, initialValue } from "./Usereducer/Usereducer";

export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducerFunction, initialValue);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;
