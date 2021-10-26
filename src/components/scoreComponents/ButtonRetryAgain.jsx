import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonRetryAgain extends Component {
  render() {
    return (
      <Link to="/">
        <button type="button" data-testid="btn-play-again">Jogar novamente</button>
      </Link>
    );
  }
}

export default ButtonRetryAgain;
