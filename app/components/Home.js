// @flow
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      accountName: 'betthefuture'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ accountName: event.target.value });
  }

  render() {
    const { accountName } = this.state;

    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
        <TextField
          id="account_name"
          value={accountName}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <Button component={Link} to={`/account/${accountName}`}>
          to ACCOUNT
        </Button>
      </div>
    );
  }
}
