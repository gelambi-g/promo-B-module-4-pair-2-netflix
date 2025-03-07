import PropTypes from "prop-types";
import { useState } from "react";

const SignUp = ({ getSignUp, signUpErrorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // events

  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };

  const handlePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const handleForm = (ev) => {
    ev.preventDefault();
    // Enviamos los datos a App y este al API
    getSignUp({
      email: email,
      password: password,
    });
  };

  // render

  const renderErrorMessage = () => {
    // Si el API ha devuelto un error, APP lo guarda en el estado y nos lo pasa
    if (signUpErrorMessage !== "") {
      return (
        <p className="border--medium border--warning mt-1">
          Error en el registro:{" "}
          <span className="text--bold">{signUpErrorMessage}</span>
        </p>
      );
    }
  };

  return (
    <section className="border--medium">
      <h1>Regístrate</h1>
      <form onSubmit={handleForm}>
        <label className="form__label display-block" htmlFor="email">
          Escribe tu email
        </label>
        <input
          className="form__input-text"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />

        <label className="form__label display-block" htmlFor="password">
          Escribe tu contraseña
        </label>
        <input
          className="form__input-text"
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />

        <input
          className="form__btn display-block"
          type="submit"
          value="Registrar"
        />

        {renderErrorMessage()}
      </form>
    </section>
  );
};

SignUp.propTypes = {
  getSignUp: PropTypes.func.isRequired,
  signUpErrorMessage: PropTypes.string,
};

export default SignUp;
