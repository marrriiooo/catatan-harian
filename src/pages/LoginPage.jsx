import React from "react";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LoginForm from "../components/LoginFrom";

function LoginPage({ loginSuccess }) {
  //? Yang ini
  const navigate = useNavigate();

  async function onLoginHandler({ email, password }) {
    try {
      const token = await login({ email, password });
      //localStorage.setItem("accessToken", token);
      loginSuccess({ accessToken: token }); //? biar state App diperbarui
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

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired, //? Tambahkan juga proptypes
};

export default LoginPage;
