import React from 'react';
// import github from 'octonode';

// const cOMMIT_API = '/repos/HdSeKenny/fluxible-sweeter/commits';
// const client = github.client({
//   username: 'cnkuan@qq.com',
//   password: 'kuan2016..'
// });

export default class About extends React.Component {
  static displayName = 'About'

  componentDidMount() {
    // client.get(cOMMIT_API, {}, (err, status, body, headers) => {
    //   console.log(body[0]); //json object
    // });
  }

  render() {
    return (
      <div className="about">
        <div className="block">
          <h3 className="title">About sweeter</h3>
          <p></p>
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

