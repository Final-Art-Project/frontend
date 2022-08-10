import { useState } from "react";
import axios from "axios";
import React from "react";

export default function Profile({ token }) {
  const [secrets, setSecrets] = useState({ msg: "Startwert" });

  const showSecret = async () => {
    try {
      const response = await axios.post("http://localhost:5000/secrets", {
        jwt: token,
      });
      setSecrets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="profile">
      <h2>Profile</h2>
      {/* <p>Inhalt wird nur angezeigt, wenn es ein JWT Token gibt.</p> */}
      <p>token: {JSON.stringify(token)}</p>
      <p>secrets: {JSON.stringify(secrets)}</p>
      <p>
        <button onClick={showSecret}>Zeige Geheimnis</button>
      </p>
    </section>
  );
}