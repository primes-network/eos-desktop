// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

// import styles from './Home.css';
import { rootRoutes } from '../constants/routes';

type Props = {
  classes: object,
  changeEOSNodeAndSyncStorage: void => {},
  config: object
};

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center'
  }
});

const EOSNodes = {
  'https://eos.greymass.com': 'operated by greymass',
  // 'https://mainnet.eoscalgary.io': 'operated by EOS Cafe',
  'https://node.eosflare.io': 'operated by EOS Flare'
};

class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      accountName: 'betthefuture'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEOSNodeChange = this.handleEOSNodeChange.bind(this);
  }

  handleChange(event) {
    this.setState({ accountName: event.target.value });
  }

  handleEOSNodeChange(event) {
    const { changeEOSNodeAndSyncStorage } = this.props;
    changeEOSNodeAndSyncStorage(event.target.value);
  }

  render() {
    const { classes, config } = this.props;
    const { accountName } = this.state;
    const nodeItems = Object.keys(EOSNodes).map(key => (
      <MenuItem key={key} value={key}>
        {key} - {EOSNodes[key]}
      </MenuItem>
    ));

    return (
      <div className={classes.root}>
        <Typography component="h2" gutterBottom>
          Primes EOS Desktop
        </Typography>
        <TextField
          id="outlined-select-currency"
          select
          label="EOS Nodes"
          className={classes.textField}
          value={config.nodeURL || ''}
          onChange={this.handleEOSNodeChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select EOS node"
          margin="normal"
          variant="outlined"
        >
          {nodeItems}
        </TextField>
        <Link to={rootRoutes.COUNTER.path}>to Counter</Link>
        <TextField
          id="account_name"
          value={accountName}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <Button component={Link} to={`/account/${accountName}/history`}>
          to ACCOUNT
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
