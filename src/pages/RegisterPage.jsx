// src/components/RegisterInput.jsx (baru)
import React from "react";

function RegisterInput({ register }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler}>
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
