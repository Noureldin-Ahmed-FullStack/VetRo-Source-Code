import { useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import "./CreatePasswordFormContainer.css";
import firebase from 'firebase/app';
import 'firebase/auth';

const CreatePasswordFormContainer = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onConfirmBtnClick = useCallback(async () => {
    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        console.error("Passwords do not match");
        // Handle error (display a message, etc.)
        return;
      }

      // Use authentication to update the user's password
      const user = firebase.auth().currentUser;
      await user.updatePassword(password);

      // you can also add additional logic after successful password creation.
    } catch (error) {
      console.error("Error during password creation:", error.message);
      // Handle error (display a message, etc.)
    }
  }, [password, confirmPassword]);

  return (
    <div className="create-password-total">
      <div className="inputs-pws">
        <h1 className="create-password">Create password</h1>
        <p className="use-a-minimum">
          Use a minimum of 10 characters, including letters, lowercase letters,
          and numbers.
        </p>
      </div>
      <div className="inputs-pws">
        <input
          className="input-box3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="input-box3"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="confirm-btn2" onClick={onConfirmBtnClick}>
        <div className="button11">Confirm</div>
      </button>
      <span className="by-creating-an-container">
        <span>{`By creating an account, you agree with our `}</span>
        <span className="terms-and-conditions">{`Terms and Conditions `}</span>
        <span>{`and `}</span>
        <span className="terms-and-conditions">Privacy Statement.</span>
      </span>
      <span className="already-have-an-container">
        <span>{`Already have an account? `}</span>
        <Link to="/signIn" className="sign-in">Sign In</Link>
      </span>
    </div>
  );
};

export default CreatePasswordFormContainer;
