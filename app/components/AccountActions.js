// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import Autorenew from '@material-ui/icons/Autorenew';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TablePaginationActionsWrapped } from './TablePaginationActions';

type Props = {
  classes: object,
  updatePagination: (
    page: integer,
    rowsPerPage: integer,
    refresh: boolean
  ) => void,
  accountActions: object,
  page: integer,
  rowsPerPage: integer,
  count: integer,
  loading: boolean
};

const styles = () => ({
  refreshCell: {
    padding: 4
  }
});

class AccountActions extends Component<Props> {
  props: Props;

  handleChangePage = (event, page) => {
    const { updatePagination, rowsPerPage } = this.props;
    updatePagination(page, rowsPerPage);
  };

  handleChangeRowsPerPage = event => {
    const { updatePagination, page } = this.props;
    updatePagination(page, event.target.value);
  };

  handleRefresh = () => {
    const { updatePagination, page, rowsPerPage } = this.props;
    updatePagination(page, rowsPerPage, true);
  };

  render() {
    const {
      classes,
      accountActions,
      page,
      rowsPerPage,
      count,
      loading
    } = this.props;

    const actions = getAccountActions(accountActions);

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Block Number</TableCell>
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
              <TableCell className={classes.refreshCell}>
                <IconButton onClick={this.handleRefresh} aria-label="Refresh">
                  <Autorenew />
                </IconButton>
                {loading && (
                  <IconButton>
                    <CircularProgress size={20} />
                  </IconButton>
                )}
              </TableCell>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={count}
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

function getAccountActions(accountActions) {
  const actions = [];
  if (accountActions.actions) {
    Object.keys(accountActions.actions).forEach(index => {
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
          <TableCell>{action.block_num}</TableCell>
          <TableCell>
            <Moment format="MM/DD/YYYY hh:mm:ss A">{action.block_time}</Moment>
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
          <TableCell style={{ wordBreak: 'break-all' }}>{actionInfo}</TableCell>
        </TableRow>
      );
    });
  }
  return actions;
}

export default withStyles(styles)(AccountActions);
