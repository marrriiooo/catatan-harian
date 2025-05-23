<<<<<<< HEAD
import React, { useState } from "react";
=======

import React, { useState } from "react";

>>>>>>> 958088b7bfd1e0cecb92d485b26ed9d91c99b24b
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/api";

function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (userData) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { error } = await register(userData);

      if (error) {
        throw new Error(error.message || "Registration failed");
      }

      setSuccessMessage("Registrasi berhasil! Mengarahkan ke halaman login...");

      // Redirect setelah 2 detik
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || "Terjadi kesalahan saat registrasi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="register-page">
      <h2 className="register-title">Gak perlu serius-serius ya isinya...</h2>

      {errorMessage && (
        <div role="alert" aria-live="assertive" className="error-message">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <RegisterInput register={handleRegister} isLoading={isLoading} />

      {isLoading && (
        <div
          role="status"
          aria-label="Memproses registrasi"
          className="loading-indicator"
        >
          Loading...
        </div>
      )}

      <p className="login-link">
        Sudah punya akun? <Link to="/login">Login disini</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
