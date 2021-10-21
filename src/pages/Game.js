import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameComponent from '../components/GameComponent';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };

    this.setLoadingFalse = this.setLoadingFalse.bind(this);
  }

  componentDidMount() {
    const { dispatch, fetchQuestion } = this.props;
    dispatch(fetchQuestion());
    this.setLoadingFalse();
  }

  setLoadingFalse() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <main>
        {loading ? 'Carregando...'
          : (
            <>
              <Header userName="Usuário Teste" />
              <GameComponent />
            </>)}
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestion: () => dispatch(fetchQuestions()) });

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  fetchQuestions: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Game);
