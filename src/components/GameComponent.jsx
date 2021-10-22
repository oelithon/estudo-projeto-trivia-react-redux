import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionPosition: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { questionPosition } = this.state;
    const MAX_QUESTIONS_POSITION = 5;

    if (questionPosition < MAX_QUESTIONS_POSITION) {
      this.setState({
        questionPosition: questionPosition + 1,
      });
    }
  }

  render() {
    const HALF_A_INT = 0.5;
    const { questions, loading } = this.props;
    const { questionPosition } = this.state;
    console.log(questions);
    const answers = questions
      .reduce((prev, eachAnswers) => (
        [...prev, [...eachAnswers.incorrect_answers, eachAnswers.correct_answer]]
      ), []);
    const shuffledAnswers = answers
      .map((eachAnswer) => eachAnswer.sort(() => HALF_A_INT - Math.random()));

    if (loading) {
      return (
        <div>Carregando...</div>
      );
    }
    return (
      <section>
        <h2 data-testid="question-category">{ questions[questionPosition].category}</h2>
        <h3 data-testid="question-text">{questions[questionPosition].question}</h3>
        {
          shuffledAnswers[questionPosition].map((answer, index) => (
            <button
              type="button"
              key={ index }
              data-testid={
                questions[questionPosition].correct_answer === answer
                  ? 'correct-answer' : `wrong-answer-${index}`
              }
              onClick={ () => this.handleClick() }
            >
              { answer }
            </button>
          ))
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.user.questions,
  loading: state.user.loading,
});

GameComponent.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  fetchQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(GameComponent);
