// @flow
import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Moment from 'react-moment';
import { TablePaginationActionsWrapped } from './TablePaginationActions';

type Props = {
  accountActions: object,
  page: number,
  rowsPerPage: number
};

export default class AccountActions extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      rowsPerPage: props.rowsPerPage
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { accountActions } = this.props;
    const { page, rowsPerPage } = this.state;

    const actions = [];
    if (accountActions.actions) {
      for (
        let index = page * rowsPerPage, loopCount = 0;
        index < accountActions.actions.length && loopCount < rowsPerPage;
        index += 1, loopCount += 1
      ) {
        const action = accountActions.actions[index];

        let actionInfo = JSON.stringify(action.action_trace.act.data);
        switch (action.action_trace.act.name) {
          case 'transfer':
            actionInfo = action.action_trace.act.data.memo;
            break;
          case 'news':
            if (action.action_trace.act.data.msg) {
              actionInfo = action.action_trace.act.data.msg;
            }
            break;
          default:
            break;
        }
        actions.push(
          <TableRow key={index}>
            <TableCell>
              <Moment format="MM/DD/YYYY hh:mm:ss A">
                {action.block_time}
              </Moment>
            </TableCell>
            <TableCell>{action.action_trace.act.name}</TableCell>
            <TableCell>
              {action.action_trace.act.name === 'transfer'
                ? action.action_trace.act.data.from
                : action.action_trace.act.account}
            </TableCell>
            <TableCell>
              {action.action_trace.act.name === 'transfer'
                ? action.action_trace.act.data.quantity
                : ''}
            </TableCell>
            <TableCell style={{ wordBreak: 'break-all' }}>
              {actionInfo}
            </TableCell>
          </TableRow>
        );
      }
    }
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>From</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{actions}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[1, 10, 25, 50]}
                count={
                  accountActions.actions ? accountActions.actions.length : 0
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}
