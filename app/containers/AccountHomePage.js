// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetAccountToken } from '../actions/accountToken';
import { resetAccountActions } from '../actions/accountActions';
import { resetAccountInfo } from '../actions/accountInfo';
import AccountHome from '../components/AccountHome';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetAccountToken,
      resetAccountActions,
      resetAccountInfo
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(AccountHome);
