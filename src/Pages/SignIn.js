import LogoContainer from "../components/LogoContainer";
import LoginForm from "../components/LoginForm";
import "./SignIn.css";

const SignIn = () => {
  return (
    <div className="desktop-sign-in">
      <LogoContainer
        logoContainerWidth="unset"
        logoContainerAlignSelf="stretch"
      />
      <LoginForm />
    </div>
  );
};

export default SignIn;
