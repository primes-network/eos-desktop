import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Account from '../components/Account';
import * as AccountActions from '../actions/account';

function mapStateToProps(state) {
  return {
    account: state.account
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AccountActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
