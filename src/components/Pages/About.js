import React from 'react';
import { Row, Col } from '../UI/Layout';
import { format } from '../../utils';

export default class About extends React.Component {

  static displayName = 'About'

  constructor() {
    super();
    this.state = {
      commits: [],
      getCommitErr: ''
    };
  }

  componentDidMount() {
    const logsStr = localStorage.getItem('sweeter_logs');
    let logs;
    let lastLogDate;
    if (logsStr) {
      logs = JSON.parse(logsStr);
      lastLogDate = logs[0].commit.author.date;
      this.setState({
        commits: logs
      });
    } else {
      this.getCommitsInfo(logs, lastLogDate);
    }

    setInterval(() => {
      this.getCommitsInfo(logs, lastLogDate);
    }, 24 * 60 * 60 * 1000);
  }

  getCommitsInfo(logs, lastLogDate) {
    $.get("/api/github/commits")
      .done((data) => {
        const newCommitDate = data[0].commit.author.date;
        if (newCommitDate === lastLogDate) {
          this.setState({
            commits: logs || data
          });
        } else {
          this.setState({
            commits: data.slice(0, 9)
          }, () => {
            const logs = data.slice(0, 9);
            localStorage.setItem('sweeter_logs', JSON.stringify(logs));
          });
        }
      })
      .fail((err) => {
        this.setState({
          getCommitErr: 'Get logs info error'
        });
      });
  }

  render() {
    const { commits, getCommitErr } = this.state;
    return (
      <div className="about">
        <div className="block">
          <Row >
            <Col size="6">
              <h2 className="title">About sweeter</h2>
              <p>This application is a simple blog website, built with basic knowleadge of react and node.</p>
              <p>The style of this website imitates sina <a href="https://weibo.com">weibo.com</a></p>
              <p>Details and source code is on github: <a href="https://github.com/HdSeKenny/fluxible-sweeter">fluxible-sweeter</a></p>
            </Col>
            <Col size="6">
              <h2 className="title">Develop logs</h2>
              {commits.map((commitObj, index) => {
                const { html_url, commit } = commitObj;
                const { author, message } = commit;
                const date = format.fromNow(author.date);
                return (
                  <div className="log-section" key={index}>
                    <a href={html_url} target="_blank"><p className="message"><strong>"{message}"</strong></p></a>
                    <p className="author"><small>{author.name}, {date}</small></p>
                  </div>
                );
              })}

              {getCommitErr && <p className="help-block">{getCommitErr}</p>}
            </Col>
          </Row>
        </div>

        <div className="block">
          <h3 className="title">About me</h3>
          <p></p>
        </div>

        <div className="block">
          <h3 className="title">About me</h3>
          <p></p>
        </div>
      </div>
    );
  }
}

