import React, { Component } from 'react';

/**
 * build general structure of whole app
 * <link href="http://localhost:3000/favicon.ico?v=2" rel="icon" />
 */
export default class Html extends Component {

  static displayName = 'Html';

  static propTypes = {
    assets: React.PropTypes.object,
    exposed: React.PropTypes.string,
    markup: React.PropTypes.string,
  };

  render() {
    const { assets, markup, exposed } = this.props;
    const { style, main, common, essentials } = assets;
    const markupHtml = { __html: markup };
    const exposedHtml = { __html: exposed };
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>Kenny"s Blog</title>
          <meta name="viewport" content="width=device-width,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, initial-scale=1" />
          <link href="/styles/bootstrap/css/font-awesome.min.css" rel="stylesheet" />
          <link href={style} rel="stylesheet" />
          <link href="/styles/components/ui/sweetalert.css" rel="stylesheet" />
          <link href="/styles/components/pages/blog.css" rel="stylesheet" />
        </head>
        <body>
          <div id="main" dangerouslySetInnerHTML={markupHtml}></div>
          <script dangerouslySetInnerHTML={exposedHtml}></script>
          <script src={common}></script>
          <script src={main}></script>
          <script src="/styles/js/sweetalert.min.js"></script>
          {essentials && (<script src={essentials}></script>)}
        </body>
      </html>
    );
  }
}