import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../../components";
import { validate } from "../../validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc } from "firebase/firestore";
import { auth, fs } from "../../config/configFirebase";
import "./signup.scss";
const SignUp = () => {
  const initialValues = { username: "", email: "", password: "" };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((preState) => {
      return { ...preState, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      const userId = createUser.user.uid;
      await setDoc(doc(fs, 'users',userId), {
        FullName: formValues.username,
        Email: formValues.email,
        Password: formValues.password,
      });
      setIsSubmit(true);
      setFormValues(initialValues);
      setTimeout(() => {
        setIsSubmit(false);
        navigate("/login");
      }, 3000);
    } catch (err) {
      setFormValues(initialValues);
      setFormErrors((preState) => {
        return { ...preState, message: err.message };
      });
    }
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
          <p style={{ marginTop: "2rem" }}>{formErrors.message}</p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
