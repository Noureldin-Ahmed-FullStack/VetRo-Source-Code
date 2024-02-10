import LogoContainer from "../components/LogoContainer";
import CreatePasswordFormContainer from "../components/CreatePasswordFormContainer";
import "./CreatePassword.css";

const CreatePassword = () => {
  return (
    <div className="desktop-create-password">
      <LogoContainer
        logoContainerWidth="unset"
        logoContainerAlignSelf="stretch"
      />
      <CreatePasswordFormContainer />
    </div>
  );
};

export default CreatePassword;
