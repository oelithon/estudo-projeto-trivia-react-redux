import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import getGavatarAPI from '../services/gravatarAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userAvatar: '',
    };
    this.requiredAPI = this.requiredAPI.bind(this);
  }

  componentDidMount() {
    this.requiredAPI();
  }

  async requiredAPI() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const returnAPI = await getGavatarAPI(hash);
    this.setState({
      userAvatar: returnAPI.url,
    });
  }

  render() {
    const { name } = this.props;
    const { userAvatar } = this.state;
    return (
      <header>
        <img
          src={ userAvatar }
          data-testid="header-profile-picture"
          alt="Foto de perfil do usuário"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.user.userInfo.name,
  email: state.user.userInfo.email,
});

export default connect(mapStateToProps)(Header);
