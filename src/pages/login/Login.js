import { useState } from "react";
import { Input } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/configFirebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./login.scss";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [isError, setIsError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((preState) => {
      return { ...preState, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setIsError(true);
    }
    setFormValues(initialValues);
  };
  const errorMse = isError ? (
    <p style={{ marginTop: "2rem", color: "red" }}>the account is not found!</p>
  ) : (
    ""
  );
  return (
    <div className="login">
      <div className="login__box">
        <h1 className="login__head">login</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            label="email"
            part="login"
            value={formValues.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            label="password"
            part="login"
            value={formValues.password}
            onChange={handleChange}
          />
          {errorMse}
          <div className="login__action">
            <span>
              don,t have an account signup
              <Link to="/login">here</Link>
            </span>
            <button className="login__btn">login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
