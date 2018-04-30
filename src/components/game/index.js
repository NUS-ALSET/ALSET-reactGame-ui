import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import AlsetReactGame from 'alset-reactgame-test';

import SelectGame from './selectGame';
import EditConfig from './editConfig';
import SelectMode from './selectMode';
import EventsTable from './eventsTable';
import Info from './info';
import allGamesConfig from '../../config.json';

const styles = theme => ({
  button: {
    margin: '5px',
    float: 'left'
  },
  controls: {
    margin: '20px 10px'
  }
});

class Index extends Component {
  constructor(props) {
    super();
    this.state = {
      activePageNum: 0,
      selectedGame: {
        index: 0,
        id: 'gemCollector',
        name: 'Gem Collector'
      },
      selectedGameMode: {
        id: null,
        name: null
      },
      selectedGameConfig: null,
      events: []
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleGameEvent = this.handleGameEvent.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  nextPage(stateKey = null, stateValue = null) {
    if (this.state.activePageNum < 3) {
      if (stateKey) {
        this.setState({ [stateKey]: stateValue });
      }
      this.setState({ activePageNum: this.state.activePageNum + 1 });
    }
  }
  previousPage() {
    if (this.state.activePageNum > 0) {
      if (this.state.activePageNum === 3) {
        this.handleGameEvent({
          type: 'end'
        });
        window.location.reload();
      }
      this.setState({ activePageNum: this.state.activePageNum - 1 });
    }
  }
  resetGame() {
    this.setState({
      activePageNum: 0,
      selectedGameId: 0,
      selectedGameMode: {
        id: null,
        name: null
      },
      selectedGameConfig: null
    });
    this.handleGameEvent({
      type: 'end'
    });
    window.location.reload();
  }
  handleGameEvent(newEvent) {
    const events = this.state.events;
    const selectedGame = allGamesConfig.games[this.state.selectedGame.index];
    this.setState({
      events: [
        ...events,
        {
          ...newEvent,
          selectedGame: selectedGame,
          gameMode: this.state.selectedGameMode,
          timeStamp: Date.now()
        }
      ]
    });
  }
  render() {
    const { classes } = this.props;
    const { activePageNum, events } = this.state;
    const controlButtons = (
      <div className={classes.controls}>
        <Divider />
        {activePageNum !== 3 ? (
          <Button variant="raised" className={classes.button} onClick={() => this.previousPage()}>
            Back
          </Button>
        ) : (
          <Button variant="raised" color="secondary" className={classes.button} onClick={() => this.resetGame()}>
            End
          </Button>
        )}
      </div>
    );
    return (
      <div>
        {this.getActivePage()}
        {activePageNum > 0 && controlButtons}
        {/* <div style={{ marginTop: '100px' }}>{activePageNum === 0 && <EventsTable events={events} />}</div> */}
      </div>
    );
  }
  getActivePage = () => {
    const { activePageNum, selectedGame, selectedGameMode, selectedGameConfig } = this.state;
    switch (activePageNum) {
      case 0: {
        return (
          <SelectGame nextPage={(key, value) => this.nextPage(key, value)} allGamesConfig={allGamesConfig.games} />
        );
      }
      case 1: {
        return (
          <EditConfig
            nextPage={(key, value) => this.nextPage(key, value)}
            selectedGame={allGamesConfig.games[selectedGame.index]}
          />
        );
      }
      case 2: {
        return (
          <SelectMode
            nextPage={(key, value) => this.nextPage(key, value)}
            selectedGame={allGamesConfig.games[selectedGame.index]}
          />
        );
      }
      case 3: {
        const showCodeEditor = selectedGameMode.id === 'bot-vs-custom-code';
        return (
          <div>
            <Info mode={selectedGameMode} game={selectedGame} config={selectedGameConfig} />
            <AlsetReactGame
              game={selectedGame.id}
              config={selectedGameConfig}
              mode={selectedGameMode.id}
              showCodeEditor={showCodeEditor}
              onScoreUpdate={() => {}}
            />
          </div>
        );
      }
      default:
        return null;
    }
  };
}

export default withStyles(styles)(Index);
