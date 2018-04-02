import axios from 'axios';

const getProfile = async username => {
  try {
    const user = await axios.get(`https://api.github.com/users/${username}`);
    return user.data;
  } catch (error) {
    console.log(error);
  }
};

const getRepos = async username => {
  try {
    const repo = await axios.get(`https://api.github.com/users/${username}/repos`);
    return repo.data;
  } catch (error) {
    console.log(error);
  }
};

const getStarCount = repos => (
  repos.reduce((count, { stargazers_count }) => (
    count + stargazers_count), 0)
);

const calculateScore = ({ followers }, repos) => (
  (followers * 3) + getStarCount(repos)
)

const getUserData = async player => {
  try {
    const [profile, repos] = await axios.all([
      getProfile(player),
      getRepos(player)])
    
    return { profile, score: calculateScore(profile, repos) }
  } catch (error) {
    console.log(error);
  }
};

const sortPlayers = players => (
  players.sort((a, b) => (b.score - a.score))
);

export default {
  battle: async players => {
    try {
      return sortPlayers(await axios.all(players.map(getUserData)));
    } catch (error) {
      console.log(error);
    }
  },
  fetchPopularRepos: async language => {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=starts:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    try {
      const response = await axios.get(encodedURI)
      return response.data.items;
    } catch (error) {
      console.log(error);
    }
  },
};
