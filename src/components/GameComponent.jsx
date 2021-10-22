import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NextButton from './gameComponents/NextButton';

class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionPosition: 0,
      seconds: 30,
      buttonOFF: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const oneSecond = 1000;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, oneSecond);
  }

  componentDidUpdate(prevProps, prevState) {
    const stopTime = 0;
    if (prevState.seconds === stopTime) {
      this.setState({
        buttonOFF: true,
        seconds: 30,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick() {
    const { questionPosition } = this.state;
    const MAX_QUESTIONS_POSITION = 5;

    if (questionPosition < MAX_QUESTIONS_POSITION) {
      this.setState({
        questionPosition: questionPosition + 1,
      });
    }
    const correctAnswer = document.querySelector('.correctAnswer');
    const wrongAnswer = document.querySelectorAll('.wrongAnswer');
    correctAnswer.style.removeProperty('border');
    wrongAnswer
      .forEach((eachWrongAnswer) => this.colorToNone(eachWrongAnswer));
    const nextBtn = document.querySelector('.btn-next');
    nextBtn.style.display = 'none';
  }

  colorToNone(eachAnswer) {
    eachAnswer.style.removeProperty('border');
  }

  handleAnswerColorChange() {
    const correctAnswer = document.querySelector('.correctAnswer');
    const wrongAnswer = document.querySelectorAll('.wrongAnswer');
    const nextBtn = document.querySelector('.btn-next');
    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';
    wrongAnswer
      .forEach((eachWrongAnswer) => this.changeWrongAnswerColor(eachWrongAnswer));
    nextBtn.style.display = '';
  }

  changeWrongAnswerColor(eachAnswer) {
    eachAnswer.style.border = '3px solid rgb(255, 0, 0)';
  }

  render() {
    const HALF_A_INT = 0.5;
    const { questions, loading } = this.props;
    const { questionPosition, seconds, buttonOFF } = this.state;
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
        <p>{`Timer: ${seconds}s`}</p>
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
              onClick={ () => this.handleAnswerColorChange() }
              disabled={ buttonOFF }
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
  questions: state.user.questions,
  loading: state.user.loading,
});

GameComponent.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  fetchQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(GameComponent);
