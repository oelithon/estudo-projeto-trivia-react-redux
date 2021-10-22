import React from 'react';

class GameHolder extends React.Component {
  render() {
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

export default GameHolder;
