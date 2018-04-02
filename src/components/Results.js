import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import api from '../utils/api';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile({ info }) {
  return (
    <PlayerPreview
      avatar={info.avatar_url}
      userName={info.login}
    >
      <ul className="space-list-items">
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
};

function Player({ label, score, profile }) {
  return (
    <div>
      <h1 className="header">{label}</h1>
      <h3 style={{ textAlign: 'center' }}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
};

class Results extends Component {  
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };

  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  async componentDidMount() {
    const { location } = this.props;
    const { playerOneName, playerTwoName } = queryString.parse(location.search);

    try {
      const players = await api.battle([playerOneName, playerTwoName])
      
      if (players === null) {
        this.setState(() => ({
          error: 'Looks like there was an error. Check that both users exist on Github',
          loading: false,
        }));
      }
      this.setState(() => ({
        error: null,
        winner: players[0],
        loser: players[1],
        loading: false,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    return (
      <div>
        {loading && <Loading />}
        {error &&
          <div>
            <p>{error}</p>
            <Link to="/battle">Reset</Link>
          </div>
        }

        {!loading &&
          <div className="row">
            <Player
              label="Winner"
              score={winner.score}
              profile={winner.profile}
            />
            <Player
              label="Loser"
              score={loser.score}
              profile={loser.profile}
            />
          </div>}
      </div>
    );
  }
}

export default Results;
