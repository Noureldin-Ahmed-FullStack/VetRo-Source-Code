import { useCallback, useState } from "react";
import SocialsLoginContainer from "./SocialsLoginContainer";
import { Link } from 'react-router-dom';
import "./LoginForm.css";
import firebase from 'firebase/app';
import 'firebase/auth';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onConfirmBtnClick = useCallback(async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      // Optionally, you can add additional logic after successful sign-in.
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      // Handle error (display a message, etc.)
    }
  }, [email, password]);

  return (
    <div className="login-total">
      <h1 className="log-in">Log In</h1>
      <div className="inputs">
        <input
          className="input-box1"
          name="Email"
          id="Email"
          placeholder="Your email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-box2"
          name="Password"
          id="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="confirm-btn1"
        id="Continue"
        onClick={onConfirmBtnClick}
      >
        <div className="button10">Continue</div>
      </button>
      <span className="or-use-one1">or use one of these options</span>
      <SocialsLoginContainer
        googleLogInId="Continue with google"
        fBLogInId="Continue with fb"
        propGap="10px"
      />
      <span className="dont-have-an-container">
        <span>{`Don’t have an account? `}</span>
        <Link to="/register" className="register">Register</Link>
      </span>
    </div>
  );
};

export default LoginForm;
