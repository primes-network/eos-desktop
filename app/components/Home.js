// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  classes: object,
  changeEOSNodeAndSyncStorage: void => {},
  config: object
};

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10%',
    alignItems: 'center'
  }
});

const EOSNodes = {
  'https://eos.greymass.com': 'operated by greymass',
  // 'https://mainnet.eoscalgary.io': 'operated by EOS Cafe',
  'https://node.eosflare.io': 'operated by EOS Flare'
  // 'https://api.eosnewyork.io': 'operated by EOS New York',
  // 'https://api.eosdetroit.io': 'operated by EOS Detroit',
  // 'https://bp.cryptolions.io': 'operated by CryptoLions',
  // 'https://api1.eosdublin.io': 'operated by EOS Dublin',
  // 'https://api2.eosdublin.io': 'operated by EOS Dublin',
  // 'https://mainnet.eoscannon.io': 'operated by EOS Cannon',
  // 'https://eos-api.privex.io': 'operated by Privex (privexinceos)',
  // 'https://eosapi.blockmatrix.network': 'operated by Block Matrix',
  // 'https://user-api.eoseoul.io': 'operated by EOSeoul',
  // 'https://api.eos.bitspace.no': 'operated by Bitspace',
  // 'https://api-eos.blckchnd.com': 'operated by BLCKCHND',
  // 'https://mainnet.eosimpera.com': 'operated by EOS IMPERA',
  // 'https://api.franceos.fr': 'operated by franceos'
};

class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      accountName: ''
    };

    this.accountNameInput = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleEOSNodeChange = this.handleEOSNodeChange.bind(this);
  }

  componentDidMount() {
    this.accountNameInput.focus();
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
        <Typography variant="h3" gutterBottom>
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
        <TextField
          id="account_name"
          value={accountName}
          placeholder="Account Name"
          margin="normal"
          variant="outlined"
          inputRef={ref => {
            this.accountNameInput = ref;
          }}
          onChange={this.handleChange}
        />
        <Button
          variant="contained"
          component={Link}
          to={`/account/${accountName}/history`}
        >
          Go to Account
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
