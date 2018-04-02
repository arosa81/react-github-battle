import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends Component {
  state = {
    userName: '',
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = (event) => {
    const value = event.target.value;

    this.setState(() => ({ userName: value }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.userName,
    );
  }

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label htmlFor="userName" className="header">
          {this.props.label}
        </label>
        <input
          type="text"
          id="userName"
          placeholder="github username"
          autoComplete="off"
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.userName}
        >
          Submit
        </button>
      </form>
    );
  }
}

class Battle extends Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null,
  };

  handleSubmit = (id, userName) => {
    this.setState(() => ({
      [`${id}Name`]: userName,
      [`${id}Image`]: `https://github.com/${userName}.png?size=200`
    }))
  }

  handleReset = (id) => {
    this.setState(() => ({
      [`${id}Name`]: '',
      [`${id}Image`]: null
    }))
  }

  render() {
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
    const { match } = this.props;
    return (
      <div>
        <div className="row">
          {!playerOneName &&
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />}

          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              userName={playerOneName}
            >
              <button
                className="reset"
                onClick={() => this.handleReset('playerOne')}
              >
                Reset
              </button>
            </PlayerPreview>}

          {!playerTwoName &&
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />}

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              userName={playerTwoName}
            >
              <button
                className="reset"
                onClick={() => this.handleReset('playerTwo')}
              >
                Reset
              </button>
            </PlayerPreview>}
        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className="button"
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`,
            }}
          >
            Battle
          </Link>}
      </div>
    );
  }
}

export default Battle;
