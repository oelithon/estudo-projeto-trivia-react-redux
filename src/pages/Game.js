import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameComponent from '../components/GameComponent';
import Header from '../components/Header';
import { fetchTokenAndQuestions } from '../redux/actions';

class Game extends Component {
  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return <div>Carregando...</div>;
    }
    return (
      <main>
        <Header userName="Usuário Teste" />
        <GameComponent />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchTokenAndQuestions()),
});

Game.propTypes = {
  loading: PropTypes.bool,
  fetchQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
