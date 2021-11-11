import React from "react";

const Testing = () => {
  const sendData = async (e) => {
    e.preventDefault();
    console.log("hello world");
  };
  return (
    <>
      <h1>Hello Testing</h1>
      <form method="POST">
        <input
          type="text"
          style={{ border: "2px solid red" }}
          name="username"
          id="username"
        />
        <input
          type="text"
          style={{ border: "2px solid red" }}
          name="email"
          id="email"
        />
        <input type="submit" value="SendData" onClick={sendData} />
      </form>
    </>
  );
};

export default Testing;
