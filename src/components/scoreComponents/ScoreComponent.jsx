import React from 'react';
import { connect } from 'react-redux';

class ScoreComponent extends React.Component {
  render() {
    const THREE = 3;
    const ZERO = 0;
    const { score, assertions } = JSON.parse(localStorage.getItem('state')).player;
    return (
      <section>
        <p data-testid="feedback-text">
          {
            assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'
          }
        </p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {
            assertions === ZERO
              ? 0 : assertions
          }
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.userInfo.name,
});

export default connect(mapStateToProps)(ScoreComponent);
