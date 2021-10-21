import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameComponent extends React.Component {
  render() {
    const HALF_A_INT = 0.5;
    const { questions } = this.props;
    console.log(questions);
    const answers = questions
      .reduce((prev, eachAnswers) => (
        [...prev, [...eachAnswers.incorrect_answers, eachAnswers.correct_answer]]
      ), []);
    const shuffledAnswers = answers
      .map((eachAnswer) => eachAnswer.sort(() => HALF_A_INT - Math.random()));
    return (
      <section>
        <div>
          <div>
            {questions.map((eachQuestion, index) => (
              <>
                <h2 data-testid="question-category">
                  {eachQuestion.category}
                </h2>
                <h3 data-testid="question-text">{eachQuestion.question}</h3>
                {
                  shuffledAnswers[index].map((answer) => (
                    <button
                      type="button"
                      key={ index }
                      data-testid={
                        eachQuestion.correct_answer === answer
                          ? 'correct-answer' : `wrong-answer-${index}`
                      }
                    >
                      { answer }
                    </button>
                  ))
                }
              </>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.user.questions,
});

GameComponent.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(GameComponent);
