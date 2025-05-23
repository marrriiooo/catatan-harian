import React from "react";

import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../utils/api";
import LoginForm from "../components/LoginFrom";

function LoginPage({ loginSuccess }) {
  const navigate = useNavigate();

  const onLoginHandler = async ({ email, password }) => {
    try {
      const token = await login({ email, password });
      loginSuccess({ accessToken: token });
      navigate("/");
    } catch (error) {
      alert("Login gagal: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Silakan masuk untuk melanjutkan...</h2>
      <LoginForm login={onLoginHandler} />

      <p>
        Belum punya akun? <Link to="/register">Daftar</Link>
      </p>
    </div>
  );
}

export default LoginPage;
