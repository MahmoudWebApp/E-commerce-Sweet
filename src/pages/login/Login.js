import { useState } from "react";
import { Input } from "../../components";
import { Link } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((preState) => {
      return { ...preState, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setFormValues(initialValues);
  };
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
