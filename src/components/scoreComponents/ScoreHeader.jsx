import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ScoreHeader extends React.Component {
  render() {
    const { name, userAvatar } = this.props;
    const { score } = JSON.parse(localStorage.getItem('state')).player;
    return (
      <header>
        <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        <img
          src={ userAvatar }
          data-testid="header-profile-picture"
          alt="Foto de perfil do usuário"
        />
        <p data-testid="header-score">
          {
            `${score}`
          }

        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.userInfo.name,
  email: state.user.userInfo.email,
  userAvatar: state.score.imageGravatar,
});

ScoreHeader.propTypes = {
  score: PropTypes.arrayOf(PropTypes.number),
}.isRequired;

export default connect(mapStateToProps)(ScoreHeader);
