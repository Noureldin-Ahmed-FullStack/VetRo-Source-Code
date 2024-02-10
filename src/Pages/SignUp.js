import LogoContainer from "../components/LogoContainer";
import FormSignUpTotal from "../components/FormSignUpTotal";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="desktop-sign-up">
      <LogoContainer
        logoContainerWidth="unset"
        logoContainerAlignSelf="stretch"
      />
      <FormSignUpTotal />
    </div>
  );
};

export default SignUp;
