import React from "react";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  async function onLoginHandler({ email, password }) {
    try {
      const token = await login({ email, password });
      localStorage.setItem("accessToken", token);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="login-page">
      <h2>Silakan masuk untuk melanjutkan...</h2>
      <LoginForm login={onLoginHandler} />
    </div>
  );
}

export default LoginPage;
