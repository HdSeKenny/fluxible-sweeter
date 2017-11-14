import React from 'react';
import configs from '../../configs';
import { Row, Col } from '../UI/Layout';
import { format } from '../../utils';

export default class About extends React.Component {

  static displayName = 'About'

  constructor() {
    super();
    this.state = {
      commits: [],
      getCommitErr: '',
      logos: [
        '/images/logo/fluxible.png',
        '/images/logo/react.png',
        '/images/logo/node.png',
        '/images/logo/mongodb.png',
        '/images/logo/webpack.png',
        '/images/logo/gulp.png'
      ]
    };
  }

  componentDidMount() {
    this.getCommitsInfo();
    this.commitInterval = setInterval(() => {
      this.getCommitsInfo();
    }, 60 * 60 * 1000);
  }

  getCommitsInfo(logs, lastLogDate) {
    $.get("/api/github/commits").done((data) => {
      // Leave about page will casuse: can't set state for unmount el
      if (!$('.content-pages .about').length) return;

      // Timeout error will cause app crashed
      if (data.err) {
        return this.setState({ getCommitErr: data.err });
      }

      const lastCommit = data[0].commit;
      const lastCommitDate = lastCommit.author.date;
      if (!this.state.commits.length) {
        return this.setState({
          commits: data.slice(0, 5)
        });
      }

      const lastStateCommit = this.state.commits[0];
      const lastStateCommitDate = lastStateCommit.author.date;
      if (this.state.commits.length && lastCommitDate !== lastStateCommitDate) {
        this.setState({
          commits: data.slice(0, 5)
        });
      }
    })
    .fail((err) => {
      if (this.setState) this.setState({ getCommitErr: 'Get logs info error' });
    });
  }

  componentWillUnmount() {
    clearInterval(this.commitInterval);
  }

  render() {
    const { commits, getCommitErr, logos } = this.state;
    const { developer, project } = configs;
    return (
      <div className="about">
        <Row className="block sweeter">
          <Col size="6">
            <h2 className="title">About sweeter</h2>
            <div className="logos">
              {logos.map((logo, index) => {
                const shouldSmall = logo.endsWith('node.png') || logo.endsWith('mongodb.png');
                const widthHeight = shouldSmall ? "70" : "80";
                return <img key={index} alt="logo" src={logo} width={widthHeight} height={widthHeight} />;
              })}
            </div>
            <p>This application is a simple blog website, built with basic knowleadge of react and node.</p>
            <p>The style of this website imitates sina <a href="https://weibo.com">weibo.com</a></p>
            <p className="mt-10">Details and source code is on github: <a href={project.github}>{project.githubName}</a></p>
          </Col>
          <Col size="6">
            <h2 className="title">Develop logs</h2>
            {getCommitErr && <p className="help-block">{getCommitErr}</p>}

            {commits.map((commitObj, index) => {
              const { html_url, commit } = commitObj;
              const { author, message } = commit;
              const date = format.fromNow(author.date);
              return (
                <div className="log-section" key={index}>
                  <a href={html_url} target="_blank">
                    <p className="message">
                      <strong>"{message}"</strong>
                    </p>
                  </a>
                  <p className="author">
                    <small>{author.name}, {date}</small>
                  </p>
                </div>
              );
            })}

            {commits.length > 0 ?
              <p className="mt-15 tar">
                <a href={project.commitsUrl}>Show All ></a>
              </p> : <h4>Loading...</h4>
            }
          </Col>
        </Row>

        <Row className="block developer">
          <Col size="2 p-0">
            <a href={developer.github} target="_blank">
              <img src={developer.image} width="150" height="150" />
            </a>
          </Col>
          <Col size="8">
            <h4 className="name">
              <a href={developer.github} target="_blank">{developer.username}</a>
            </h4>
            <h5><strong>{developer.job}</strong></h5>
            <div className="mb-10">
              <p>{developer.email}</p>
              <p>{developer.birthday}</p>
            </div>

            <p>{developer.description}</p>
          </Col>
        </Row>

        <Row className="block leave-message">
          <Col size="12">
            <h3 className="title">Leave a message</h3>
            <form className="message-form">
              <div className="username">
                <input className="form-control" placeholder="input an username" />
              </div>
              <div className="message">
                <textarea className="form-control" placeholder="input your message"></textarea>
              </div>
              <button className="btn btn-info"><i className="fa fa-paper-plane"></i> Submit</button>
            </form>

          </Col>
        </Row>
      </div>
    );
  }
}

