import React, { Component } from 'react';
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
    const mail = 'elithonsilva@gmail.com';
    const hash = md5(mail).toString();
    const returnAPI = await getGavatarAPI(hash);
    this.setState({
      userAvatar: returnAPI.url,
    });
  }

  render() {
    const { userAvatar } = this.state;
    return (
      <header>
        <img
          src={ userAvatar }
          data-testid="header-profile-picture"
          alt="Foto de perfil do usuário"
        />
        <p data-testid="header-player-name">nome do usuário</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

export default Header;
