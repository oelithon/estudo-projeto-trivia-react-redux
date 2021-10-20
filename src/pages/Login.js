import React from 'react';
import ButtonSettings from '../components/loginComponents/ButtonSettings';
import LoginFormComponent from '../components/loginComponents/LoginFormComponent';

class Login extends React.Component {
  render() {
    return (
      <>
        <LoginFormComponent />
        <ButtonSettings />
      </>
    );
  }
}

export default Login;
