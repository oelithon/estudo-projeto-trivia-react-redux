import PropTypes from 'prop-types';
import React from 'react';

class NextButton extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ onClick }
          className="btn-next"
          style={ { display: 'none' } }
        >
          Próxima pergunta
        </button>
      </div>
    );
  }
}

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NextButton;
