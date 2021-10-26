import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ScoreComponent extends React.Component {
  render() {
    const { score, assertions } = JSON.parse(localStorage.getItem('state')).player;
    const THREE = 3;
    const ZERO = 0;
    return (
      <section>
        <p data-testid="feedback-text">
          {
            assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'
          }
        </p>
        <p data-testid="feedback-total-score">
          {`Pontuação: ${score}`}
        </p>
        <p data-testid="feedback-total-question">
          {
            assertions === ZERO
              ? 'Não acertou nenhuma pergunta' : `Acertou ${assertions} perguntas`
          }
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
