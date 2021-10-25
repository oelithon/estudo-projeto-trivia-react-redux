import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NextButton from './gameComponents/NextButton';
import { ableButtons, stopTime } from '../redux/actions';
import { changeDisplayAndStyle } from './helpers';
import history from '../history';

class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionPosition: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleAnswerColorChange = this.handleAnswerColorChange.bind(this);
  }

  componentDidUpdate() {
    this.nextQuestionWithTimes();
  }

  handleClick() {
    const { questionPosition } = this.state;
    const { nextBtnDispatch } = this.props;
    const MAX_QUESTIONS_POSITION = 5;

    if (questionPosition < MAX_QUESTIONS_POSITION) {
      this.setState({
        questionPosition: questionPosition + 1,
      });
    }

    if (questionPosition === (MAX_QUESTIONS_POSITION - 1)) {
      const { name, score, email } = this.props;
      localStorage.setItem('state', JSON.stringify({ player:
        { name,
          assertions: score.length,
          score: score
            .reduce((prev, curr) => prev + curr, 0),
          gravatarEmail: email,
        },
      }));
      history.push('/score');
    }
    changeDisplayAndStyle();
    nextBtnDispatch();
  }

  handleAnswerColorChange(event) {
    const { clickStopTime, questions } = this.props;
    const { questionPosition } = this.state;
    const correctAnswer = document.querySelector('.correctAnswer');
    const wrongAnswer = document.querySelectorAll('.wrongAnswer');
    const nextBtn = document.querySelector('.btn-next');
    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';
    wrongAnswer
      .forEach((eachWrongAnswer) => this.changeWrongAnswerColor(eachWrongAnswer));
    nextBtn.style.display = '';
    const difficultyLevel = this.difficultyLevel(questions[questionPosition].difficulty);
    if (event.target.className === 'correctAnswer') {
      clickStopTime(difficultyLevel);
    }
  }

  difficultyLevel(difficulty) {
    const THREE = 3;
    switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return THREE;
    default: return 0;
    }
  }

  nextQuestionWithTimes() {
    const { statusButton } = this.props;
    const nextBtn = document.querySelector('.btn-next');
    if (statusButton) {
      nextBtn.style.display = '';
    }
  }

  changeWrongAnswerColor(eachAnswer) {
    eachAnswer.style.border = '3px solid rgb(255, 0, 0)';
  }

  render() {
    console.log('renderizou');
    const HALF_A_INT = 0.5;
    const { questions, loading, statusButton } = this.props;
    const { questionPosition } = this.state;
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
              className={
                questions[questionPosition].correct_answer === answer
                  ? 'correctAnswer' : 'wrongAnswer'
              }
              onClick={ (event) => this.handleAnswerColorChange(event) }
              disabled={ statusButton }
            >
              { answer }
            </button>
          ))
        }
        <NextButton onClick={ () => this.handleClick() } />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.userInfo.name,
  score: state.game.clickedTimes,
  email: state.user.userInfo.email,
  questions: state.user.questions,
  loading: state.user.loading,
  statusButton: state.game.statusButton,
});

const mapDispatchToProps = (dispatch) => ({
  nextBtnDispatch: (state) => dispatch(ableButtons(state)),
  clickStopTime: (state) => dispatch(stopTime(state)),
});

GameComponent.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  fetchQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);
