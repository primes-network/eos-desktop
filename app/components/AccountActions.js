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
  accountActions: object
};

export default class AccountActions extends Component<Props> {
  props: Props;

  handleChangePage = (event, page) => {
    console.log(event);
    console.log(page);
    // this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    console.log(event);
    // this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { accountActions } = this.props;

    const actions = [];
    if (accountActions.actions) {
      Object.keys(accountActions.actions).forEach(key => {
        const action = accountActions.actions[key];
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
          <TableRow key={key}>
            <TableCell component="th" scope="row">
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
            <TableCell>{actionInfo}</TableCell>
          </TableRow>
        );
      });
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
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={20}
                rowsPerPage={20}
                page={1}
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
