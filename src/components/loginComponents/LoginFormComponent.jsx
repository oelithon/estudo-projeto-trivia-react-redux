import React from 'react';

class LoginFormComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.handleDisabled());
  }

  handleDisabled() {
    const { email, name } = this.state;

    if (email && name) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { disabled, name, email } = this.state;
    return (
      <>
        <label htmlFor="nameLogin">
          Nome
          <input
            id="nameLogin"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="emailLogin">
          Email
          <input
            id="emailLogin"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          data-testid="btn-play"
        >
          Entrar

        </button>
      </>
    );
  }
}

export default LoginFormComponent;
