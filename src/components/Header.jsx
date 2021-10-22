import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import getGavatarAPI from '../services/gravatarAPI';
import { disableButton } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userAvatar: '',
      seconds: 30,
    };
    this.requiredAPI = this.requiredAPI.bind(this);
  }

  componentDidMount() {
    this.requiredAPI();
    this.updateTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { time } = this.props;
    const { seconds } = this.state;
    const stopTime = 1;
    if (prevState.seconds === stopTime) {
      time(seconds);
      clearInterval(this.interval);
    }
  }

  updateTimer() {
    const oneSecond = 1000;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, oneSecond);
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
    const { userAvatar, seconds } = this.state;
    return (
      <header>
        <p>{`Timer: ${seconds}s`}</p>
        <img
          src={ userAvatar }
          data-testid="header-profile-picture"
          alt="Foto de perfil do usuário"
        />
        <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        <p data-testid="header-score">Score: 0</p>
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

const mapDispatchToProps = (dispatch) => ({
  time: (state) => dispatch(disableButton(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
