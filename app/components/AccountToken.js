// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

type Props = {
  classes: object,
  tokens: object
};

const styles = {
  card: {
    minWidth: 175,
    maxWidth: 240
  }
};

class AccountHistory extends Component<Props> {
  props: Props;

  render() {
    const { classes, tokens } = this.props;

    const tokenCards = [];
    Object.keys(tokens).forEach(symbol => {
      const token = tokens[symbol];
      tokenCards.push(
        <GridListTile key={symbol}>
          <Card className={classes.card}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {token.account}
              </Typography>
              <Typography variant="h5" component="h3">
                {token.balance} {symbol}
              </Typography>
            </CardContent>
          </Card>
        </GridListTile>
      );
    });
    return (
      <div className={classes.root}>
        <GridList cellHeight={110} cols={5}>
          {tokenCards}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(AccountHistory);
