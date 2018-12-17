// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccountActionActions from '../actions/accountActions';
import AccountActions from '../components/AccountActions';

type Props = {
  fetchAccountActions: (accountName: string) => void,
  updatePagination: (page: integer, rowsPerPage: integer) => void,
  accountName: string,
  accountActions: object
};

class AccountActionsContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    const { fetchAccountActions, accountName, accountActions } = this.props;
    if (accountActions.count === 0) {
      fetchAccountActions(
        accountName,
        accountActions.page,
        accountActions.rowsPerPage
      );
    }
  }

  render() {
    const { accountActions, updatePagination } = this.props;
    return (
      <AccountActions
        accountActions={accountActions}
        page={accountActions.page}
        rowsPerPage={accountActions.rowsPerPage}
        count={accountActions.count}
        loading={accountActions.loading}
        updatePagination={updatePagination}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accountActions: state.accountActions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AccountActionActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountActionsContainer);
