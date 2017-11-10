import github from 'octonode';
import path from 'path';

export default (req, res) => {
  const username = 'HdSeKenny';
  const projectName = 'fluxible-sweeter';
  const API = path.join('repos', username, projectName, 'commits');
  const client = github.client({
    username: 'cnkuan@qq.com',
    password: 'kuan2016..'
  });

  client.get(API, {}, (err, status, body, headers) => {
    if (err) throw err;
    res.status(200).json(body);
  });
};
