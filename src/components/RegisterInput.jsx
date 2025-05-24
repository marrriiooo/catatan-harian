import React, { useState } from "react";
import PropTypes from "prop-types";

function RegisterInput({ register }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
  });

  const handleInputChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
      errorMessage: "", // Reset error saat input berubah
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    // Validasi input
    if (password !== confirmPassword) {
      setFormData({
        ...formData,
        errorMessage: "Password dan konfirmasi password tidak cocok",
      });
      return;
    }

    if (password.length < 6) {
      setFormData({
        ...formData,
        errorMessage: "Password minimal 6 karakter",
      });
      return;
    }

    register({ name, email, password });
  };

  const { name, email, password, confirmPassword, errorMessage } = formData;

  return (
    <form onSubmit={onSubmitHandler} className="register-input">
      {errorMessage && (
        <div role="alert" aria-live="polite" className="error-message">
          {errorMessage}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Nama</label>
        <input
          id="name"
          type="text"
          placeholder="Nama"
          value={name}
          onChange={handleInputChange("name")}
          autoComplete="name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange("email")}
          autoComplete="email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange("password")}
          autoComplete="new-password"
          minLength="6"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Konfirmasi Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Konfirmasi Password"
          value={confirmPassword}
          onChange={handleInputChange("confirmPassword")}
          autoComplete="new-password"
          minLength="6"
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Daftar
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
