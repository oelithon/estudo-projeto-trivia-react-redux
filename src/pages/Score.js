import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ScoreComponent from '../components/scoreComponents/ScoreComponent';
import ScoreHeader from '../components/scoreComponents/ScoreHeader';
import ButtonRetryAgain from '../components/scoreComponents/ButtonRetryAgain';
import { fetchImageToHeader } from '../redux/actions';

class Score extends React.Component {
  componentDidMount() {
    const { fetchImage } = this.props;
    fetchImage();
  }

  render() {
    const { loading } = this.props;
    if (!loading) {
      return <div>Carregando...</div>;
    }
    return (
      <section>
        <ScoreHeader />
        <ScoreComponent />
        <ButtonRetryAgain />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchImage: () => dispatch(fetchImageToHeader()),
});

Score.propTypes = {
  loading: PropTypes.bool,
  fetchImage: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Score);
