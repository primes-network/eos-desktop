// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccountActionActions from '../actions/accountActions';
import AccountActions from '../components/AccountActions';
import * as PaginationActions from '../actions/pagination';

type Props = {
  fetchAccountActions: (accountName: string) => void,
  updatePagination: (page: integer, rowsPerPage: integer) => void,
  accountName: string,
  accountActions: object,
  pagination: object
};

class AccountActionsContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    const { fetchAccountActions, accountName, pagination } = this.props;
    fetchAccountActions(accountName, pagination.page, pagination.rowsPerPage);
  }

  render() {
    const { accountActions, pagination, updatePagination } = this.props;
    return (
      <AccountActions
        accountActions={accountActions}
        page={pagination.page}
        rowsPerPage={pagination.rowsPerPage}
        count={pagination.count}
        updatePagination={updatePagination}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accountActions: state.accountActions,
    pagination: state.pagination
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...AccountActionActions, ...PaginationActions },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountActionsContainer);
