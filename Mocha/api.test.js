const assert = require('assert');
const nock = require('nock');
const getGitHubUserProfile = require('./api');

describe('getGitHubUserProfile', () => {
  it('fetches user profile data from GitHub API', async () => {
    const mockResponse = {
      login: 'matheusranzani',
      name: 'Matheus Ranzani',
      public_repos: 19,
    };

    // Simulate a successful request using nock
    nock('https://api.github.com')
      .get('/users/matheusranzani')
      .reply(200, mockResponse);

    const userProfile = await getGitHubUserProfile('matheusranzani');

    assert.strictEqual(userProfile.login, 'matheusranzani');
    assert.strictEqual(userProfile.name, 'Matheus Ranzani');
    assert.strictEqual(userProfile.public_repos, 19);
  });
});
