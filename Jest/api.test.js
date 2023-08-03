const fetch = require('node-fetch');
const getGitHubUserProfile = require('./api');

jest.mock('node-fetch');

test('getGitHubUserProfile fetches user profile data from GitHub API', async () => {
  const mockResponse = {
    login: 'matheusranzani',
    name: 'Matheus Ranzani',
    public_repos: 19,
  };

  fetch.mockResolvedValueOnce({
    json: async () => mockResponse,
  });

  const userProfile = await getGitHubUserProfile('matheusranzani');

  expect(userProfile.login).toBe('matheusranzani');
  expect(userProfile.name).toBe('Matheus Ranzani');
  expect(userProfile.public_repos).toBe(19);
});
