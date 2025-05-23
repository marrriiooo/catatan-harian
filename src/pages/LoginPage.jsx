import React from "react";
<<<<<<< HEAD
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../utils/api";
import LoginForm from "../components/LoginFrom";

=======

import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../utils/api";
import LoginForm from "../components/LoginFrom";

>>>>>>> 958088b7bfd1e0cecb92d485b26ed9d91c99b24b
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
<<<<<<< HEAD
=======

>>>>>>> 958088b7bfd1e0cecb92d485b26ed9d91c99b24b
      <p>
        Belum punya akun? <Link to="/register">Daftar</Link>
      </p>
    </div>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
