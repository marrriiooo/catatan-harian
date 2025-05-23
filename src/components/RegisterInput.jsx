import React from "react";
import PropTypes from "prop-types";

class RegisterInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };

    // Gunakan arrow function untuk menghindari binding
    this.handleInputChange = (field) => (e) => {
      this.setState({
        [field]: e.target.value,
        errorMessage: "", // Reset error saat input berubah
      });
    };

    this.onSubmitHandler = (e) => {
      e.preventDefault();
      const { name, email, password, confirmPassword } = this.state;

      // Validasi input
      if (password !== confirmPassword) {
        this.setState({
          errorMessage: "Password dan konfirmasi password tidak cocok",
        });
        return;
      }

      if (password.length < 6) {
        this.setState({ errorMessage: "Password minimal 6 karakter" });
        return;
      }

      this.props.register({
        name,
        email,
        password,
      });
    };
  }

  render() {
    const { name, email, password, confirmPassword, errorMessage } = this.state;

    return (
      <form onSubmit={this.onSubmitHandler} className="register-input">
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
            onChange={this.handleInputChange("name")}
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
            onChange={this.handleInputChange("email")}
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
            onChange={this.handleInputChange("password")}
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
            onChange={this.handleInputChange("confirmPassword")}
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
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
