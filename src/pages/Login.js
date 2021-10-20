import React from 'react';
import LoginFormComponent from '../components/loginComponents/LoginFormComponent';
import ButtonSettings from '../components/loginComponents/ButtonSettings';

class Login extends React.Component {
  render() {
    return (
      <section>
        <LoginFormComponent />
        <ButtonSettings />
      </section>
    );
  }
}

export default Login;
