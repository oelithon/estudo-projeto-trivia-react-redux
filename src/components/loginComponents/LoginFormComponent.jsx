import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestToken } from '../helpers';
import { userLogin } from '../../redux/actions';

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
    this.dispatchRequest = this.dispatchRequest.bind(this);
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

  dispatchRequest() {
    const { loginDispatch } = this.props;
    loginDispatch(this.state);
    requestToken();
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
        <Link to="/game">
          <button
            type="button"
            disabled={ disabled }
            data-testid="btn-play"
            onClick={ () => this.dispatchRequest() }
          >
            Jogar
          </button>
        </Link>
      </>
    );
  }
}

LoginFormComponent.propTypes = {
  loginDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (state) => dispatch(userLogin(state)),
});

export default connect(null, mapDispatchToProps)(LoginFormComponent);
