import React from 'react';
import PropTypes from 'prop-types';

/**
 * build general structure of whole app
 * <link href="http://localhost:3000/favicon.ico?v=2" rel="icon" />
 */
export default class Html extends React.Component {

  static displayName = 'Html';

  static propTypes = {
    assets: PropTypes.object,
    exposed: PropTypes.string,
    markup: PropTypes.string
  };

  render() {
    const { assets, markup, exposed } = this.props;
    const { style, main, common, essentials } = assets;
    const markupHtml = { __html: markup };
    const exposedHtml = { __html: exposed };
    return (
      <html lang="en" className="no-js">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>Sweeter</title>
          <meta name="author" content="Kenny" />
          <meta name="viewport" content="width=device-width,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, initial-scale=1" />
          <link href="http://fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,400italic,500,600,700" rel="stylesheet" />
          <link href="http://fonts.googleapis.com/css?family=Roboto%3A700%2C300" rel="stylesheet" property="stylesheet" media="all" />
          <link href="/styles/css/font-awesome.min.css" rel="stylesheet" />
          <link href="/styles/css/sweetalert.css" rel="stylesheet" />
          <link href="/styles/css/slim.min.css" rel="stylesheet" />
          <link href="/styles/css/blog.css" rel="stylesheet" />

          <link href="/assets/revolution/css/settings.css" rel="stylesheet" media="screen" />
          <link href="/assets/revolution/css/layers.css" rel="stylesheet" />
          <link href="/assets/revolution/css/navigation.css" rel="stylesheet" />

          <link href={style} rel="stylesheet" />

          <script src="/styles/js/jquery.min.js"></script>
          <script src="/styles/js/bootstrap.min.js"></script>
        </head>
        <body>
          <div className="loading"><div className="loader"></div></div>
          <div id="main" dangerouslySetInnerHTML={markupHtml}></div>
          <script dangerouslySetInnerHTML={exposedHtml}></script>

          <script src={common}></script>
          <script src={main}></script>

          <script src="/styles/js/sweetalert.min.js"></script>
          <script src="/assets/revolution/js/jquery.themepunch.tools.min.js"></script>
          <script src="/assets/revolution/js/jquery.themepunch.revolution.min.js"></script>
          <script src="/assets/revolution/js/extensions/revolution.extension.actions.min.js"></script>
          <script src="/assets/revolution/js/extensions/revolution.extension.carousel.min.js"></script>
          <script src="/assets/revolution/js/extensions/revolution.extension.kenburn.min.js"></script>
          <script src="/assets/revolution/js/extensions/revolution.extension.layeranimation.min.js"></script>
          <script src="/assets/revolution/js/extensions/revolution.extension.migration.min.js"></script>
          <script src="/assets/revolution/js/extensions/revolution.extension.navigation.min.js"></script>
          <script src="/assets/revolution/js/extensions/revolution.extension.parallax.min.js"></script>
          <script src="/assets/revolution/js/extensions/revolution.extension.slideanims.min.js"></script>
          <script src="/assets/revolution/js/extensions/revolution.extension.video.min.js"></script>
          {essentials && <script src={essentials}></script>}
        </body>
      </html>
    );
  }
}
