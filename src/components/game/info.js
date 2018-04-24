import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    margin :'10px',
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

function Info(props) {
  const { classes, mode, config } = props;
  const showPlayersInfo = [false, false];
  switch (mode.id) {
    case 'player-vs-player': {
      showPlayersInfo[0] = true;
      showPlayersInfo[1] = true;
      break;
    }
    case 'player-vs-bot': {
      showPlayersInfo[0] = true;
      break;
    }
    case 'bot-vs-bot': {
      break;
    }
    case 'bot-vs-custom-code': {
      break;
    }
    default: {
    }
  }
  if (showPlayersInfo[0] === false && showPlayersInfo[1] === true) {
    return '';
  }
  const getInfo = data => {
    let info = '';
    for (let key in data) {
      info = `${info}, ${key.toUpperCase()} : ${data[key]} `;
    }
    return info;
  };
  const getMode=(index)=>{
    return mode.id.split('-')[index].toUpperCase();
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
         
          <Grid item xs={5}>
            <Paper className={classes.paper}>{ showPlayersInfo[0] ? (<span> <b>Player 1</b> : {getInfo(config.player1Keys)}</span>) : (<span>{getMode(0)}</span>)}</Paper>
          </Grid>
        
        <Grid item xs={2}>
            <Paper className={classes.paper}>{mode.name}</Paper>
          </Grid>
         
          <Grid item xs={5}>
            <Paper className={classes.paper}>{ showPlayersInfo[1] ? (<span> <b>Player 2</b> : {getInfo(config.player2Keys)}</span>) : (<span>{getMode(2)}</span>)}</Paper>
          </Grid>
        
      </Grid>
    </div>
  );
}


Info.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Info);
