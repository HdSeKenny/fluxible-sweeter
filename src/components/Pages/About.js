import React from 'react';

export default class About extends React.Component {

  static displayName = 'About'

  constructor() {
    super();
    this.state = {
      commits: []
    }
  }

  componentDidMount() {
    $.get('/api/github/commits', (data) => {
      this.setState({ commits: data });
    });
  }

  render() {
    const { commits } = this.state;
    return (
      <div className="about">
        <div className="block">
          <h3 className="title">About sweeter</h3>
          {commits.map((commit) => {
            return <p>{commit.sha}</p>;
          })}
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

