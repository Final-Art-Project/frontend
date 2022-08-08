import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Profile from "./components/Profile";
import jwt_decode from "jwt-decode";

import axios from "axios";
import "./App.css";

const App = () => {
  const [user, setUser] = useState({ name: "", password: "" });
  const [apiResponse, SetApiResponse] = useState({
    login: null,
    jwt: null,
    msg: null,
  });
  const [loggedIn, setLoggedIn] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  // FALLS DIE API EINEN TOKEN ZURÜCK LIEFERT, WIRD DIESER
  // DECODIERT UND ANGEZEIGT
  useEffect(() => {
    // nicht beim ersten Laden
    if (apiResponse.jwt) {
      // Token dekodieren
      const decodedToken = jwt_decode(apiResponse.jwt);
      // State setzen, führt zur Anzeige im Browser
      setDecodedToken(decodedToken);
    }
  }, [apiResponse]);

  // FUNCTION TO HANLDE CHANING OF INPUT FIELDS
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // FUNCTION TO HANDLE SENDING OF FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", user);
      SetApiResponse(response.data);
      if (response.data.login === true) setLoggedIn(true);
      else setLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="App">
        {/* LOGIN STATUS OVERLAY */}
        <aside
          className="loginStatus"
          style={{
            backgroundColor: loggedIn ? "hsl(133, 100%, 80%)" : undefined,
          }}
        >
          <h3>[State] Login Status</h3>
          <p>{JSON.stringify(loggedIn)}</p>
        </aside>

        {/* DEV OVERLAY */}
        <aside className="devOverlay">
          <h3>Fixed user in DB</h3>
          <p>email: ich@hier.de / pwd: 1234</p>

          <h3>[State] user</h3>
          <p>{JSON.stringify(user)}</p>

          <h3>[API] response</h3>
          <p>
            login: {apiResponse ? JSON.stringify(apiResponse.login) : undefined}
          </p>
          <p>
            msg: {apiResponse ? JSON.stringify(apiResponse.msg) : undefined}
          </p>

          <h3>Decoded Token:</h3>
          <p>
            jwt:{" "}
            {apiResponse
              ? // display only the first 20 characters (layout reasons)
                JSON.stringify(apiResponse.jwt).substring(0, 20) + '..."'
              : undefined}
          </p>
          <p>{decodedToken ? JSON.stringify(decodedToken) : undefined}</p>
          <p>
            <strong>Ausgestellt:</strong>
            {decodedToken
              ? " " + new Date(decodedToken.iat * 1000).toString()
              : undefined}
          </p>
          <p>
            <strong>Läuft ab:</strong>
            {decodedToken
              ? " " + new Date(decodedToken.exp * 1000).toString()
              : undefined}
          </p>
        </aside>

        {/* NORMAL CONTENT */}
        <h1>JSON WEB TOKEN (JWT) DEMO</h1>
        <section className="registerContainer">
          <Register />
        </section>
        <section className="loginContainer">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor="username">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
            />
            <button type="submit">Einloggen</button>
            <p className="error">
              {apiResponse.login === false ? apiResponse.msg : undefined}
            </p>
          </form>
        </section>
        <Profile token={apiResponse.jwt} />
      </div>
      );
    </>
  );
};

export default App;
