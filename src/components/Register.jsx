import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // FUNCTION TO HANLDE CHANING OF INPUT FIELDS
  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // FUNCTION TO HANDLE SENDING OF FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        registerData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <aside>
        <h3>[State] registerData</h3>
        <p>email: {JSON.stringify(registerData.email)}</p>
        <p>name: {JSON.stringify(registerData.name)}</p>
        <p>password: {JSON.stringify(registerData.password)}</p>
      </aside>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          name="name"
          id="name"
          value={registerData.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={registerData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={registerData.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
