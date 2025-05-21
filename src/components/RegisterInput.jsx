// src/components/RegisterInput.jsx
import React from "react";

function RegisterInput({ register }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function onSubmitHandler(event) {
    event.preventDefault();
    register({ name, email, password });
  }

  return (
    <form onSubmit={onSubmitHandler} className="register-input">
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Daftar</button>
    </form>
  );
}

export default RegisterInput;
