import { connect } from 'react-redux';
import actions from '../actions';
import Player from '../components/index';

const mapStateToProps = state => ({
  video: state.video,
  // displayRules: state.layout.siteConfig.siteName !== 'cp909',
});

const mapDispatchToProps = dispatch => ({
  play: idx => {
    dispatch(actions.play(idx));
  },
});

const ConnectedPlayer = connect(mapStateToProps, mapDispatchToProps)(Player);

export default ConnectedPlayer;