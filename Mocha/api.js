const fetch = require('node-fetch');

async function getGitHubUserProfile(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  return data;
}

module.exports = getGitHubUserProfile;
