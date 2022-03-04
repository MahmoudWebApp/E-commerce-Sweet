import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "../../components";
import { validate } from "../../validate";
import {auth,fs } from "../../config/config";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import "./signup.scss";
const SignUp = () => {
  const history=useNavigate();
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((preState) => {
      return { ...preState, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
\    createUserWithEmailAndPassword(auth,formValues.email, formValues.password)
      .then((credentials) => {
        fs.collection("user")
          .doc(credentials.user.uid)
          .set({
            fullName: formValues.username,
            Email: formValues.email,
            Password: formValues.password,
          }).then(() => {
            setIsSubmit(true);
            setFormValues(initialValues);
            setFormErrors({});
            setTimeout(()=>{
              setIsSubmit(false);
              history.push("./login")
            },300)
          })
          .catch((error) => {
            setFormErrors(error.message);
          });
      }).catch((error) => {
        setFormErrors(error.message);
      });
  };
  return (
    <div className="signup">
      {Object.keys(formErrors).length === 0 && isSubmit && (
        <h1 className="signup__success">signed in successfully</h1>
      )}
      <div className="signup__box">
        <h1 className="signup__head">sign up</h1>
        <form className="signup__form" onSubmit={handleSubmit}>
          <Input
            name="username"
            part="signup"
            type="text"
            label="full name"
            value={formValues.username}
            onChange={handleChange}
          />
          <p>{formErrors.username}</p>
          <Input
            name="email"
            part="signup"
            type="email"
            label="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <p>{formErrors.email}</p>
          <Input
            name="password"
            part="signup"
            type="password"
            label="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <p>{formErrors.password}</p>
          <div className="signup__action">
            <span>
              already have an account login
              <Link to="/login">here</Link>
            </span>
            <button className="signup__btn">signup</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
