// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

type Props = {
  classes: object,
  accountName: string,
  owns: object,
  all: object,
  fetchAccountToken: () => void
};

const styles = {
  root: {
    display: 'flex'
  },
  ownedToken: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 'calc(100% - 250px)',
    alignItems: 'flex-start',
    alignContent: 'flex-start'
  },
  allTokenListContainer: {
    width: '250px'
  },
  card: {
    display: 'flex',
    marginRight: 10,
    marginBottom: 15,
    minWidth: 175
  },
  cardCover: {
    width: 100,
    media: {
      width: 50
    }
  }
};

class AccountToken extends Component<Props> {
  props: Props;

  render() {
    const { classes, owns, all, accountName, fetchAccountToken } = this.props;

    const ownsCards = [];
    if (owns != null) {
      Object.keys(owns).forEach(key => {
        const token = owns[key];
        ownsCards.push(
          <Card className={classes.card} key={key}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {token.token.account}
              </Typography>
              <Typography variant="h5" component="h3">
                {token.balance} {token.token.symbol}
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.cardCover}
              image={token.token.logo}
              title={token.token.name}
            />
          </Card>
        );
      });
    }

    let allTokenList = [];
    if (all != null) {
      allTokenList = all.map(token => (
        <ListItem key={`${token.symbol}-${token.account}`}>
          <ListItemAvatar>
            <Avatar src={token.logo} />
          </ListItemAvatar>
          <ListItemText primary={token.symbol} secondary={token.name} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Delete"
              onClick={() => fetchAccountToken(accountName, token)}
            >
              <AddBoxIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ));
    }

    return (
      <div className={classes.root}>
        <div className={classes.ownedToken}>{ownsCards}</div>
        <div className={classes.allTokenListContainer}>
          <Paper className={classes.allTokenList}>
            <List style={{ maxHeight: '100%', overflow: 'auto' }}>
              {allTokenList}
            </List>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AccountToken);
