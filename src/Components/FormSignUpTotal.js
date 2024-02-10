import { useCallback, useState } from "react";
import SocialsLoginContainer from "./SocialsLoginContainer";
import { Link } from 'react-router-dom';
import "./FormSignUpTotal.css";
import firebase from 'firebase/app';
import 'firebase/auth';

const FormSignUpTotal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onConfirmBtnClick = useCallback(async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Optionally, you can add additional logic after successful sign-up.
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      // Handle error (display a message, etc.)
    }
  }, [email, password]);

  return (
    <div className="sign-up-total">
      <h1 className="sign-up">Sign Up</h1>
      <div className="inputs-sign-up">
        <input
          className="input-box"
          placeholder="Your email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-box"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="confirm-btn" onClick={onConfirmBtnClick}>
          <div className="button9">Continue</div>
        </button>
      </div>
      <div className="social-media-log-in">
        <span className="or-use-one">or use one of these options</span>
      </div>
      <SocialsLoginContainer />
      <span className="already-have-an-container">
        <span>{`Already have an account? `}</span>
        <Link to="/signIn" className="sign-in">Sign In</Link>
      </span>
    </div>
  );
};

export default FormSignUpTotal;
