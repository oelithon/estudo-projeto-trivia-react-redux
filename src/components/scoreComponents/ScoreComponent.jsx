import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ScoreComponent extends React.Component {
  render() {
    const { score, assertions } = JSON.parse(localStorage.getItem('state')).player;
    return (
      <section>
        <p data-testid="feedback-text">
          Oi
        </p>
        <p data-testid="feedback-total-score">
          {`Pontuação: ${score}`}
        </p>
        <p data-testid="feedback-total-question">
          {`Total de respostas corretas: ${assertions}`}
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.userInfo.name,
});

ScoreComponent.propTypes = {
  score: PropTypes.arrayOf(PropTypes.number),
}.isRequired;

export default connect(mapStateToProps)(ScoreComponent);
