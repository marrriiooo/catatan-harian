import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/api";

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    try {
      const accessToken = await login({ email, password });
      loginSuccess({ accessToken });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <section className="login-page">
      <h2>Silakan masuk untuk melanjutkan ...</h2>
      <LoginInput login={onLogin} />
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini.</Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
