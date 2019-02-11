// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as ConfigActions from '../actions/config';

type Props = {
  loadConfigFromStorage: void => {},
  changeEOSNodeAndSyncStorage: void => {},
  config: object
};

class HomePage extends Component<Props> {
  props: Props;

  componentWillMount() {
    const { loadConfigFromStorage } = this.props;
    loadConfigFromStorage();
  }

  render() {
    const { changeEOSNodeAndSyncStorage, config } = this.props;
    return (
      <Home
        config={config}
        changeEOSNodeAndSyncStorage={changeEOSNodeAndSyncStorage}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConfigActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
