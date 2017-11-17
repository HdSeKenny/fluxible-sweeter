import React from 'react';
import PropTypes from 'prop-types';
import configs from './configs';
import { assets } from '../../configs/assets';

export default class PdfHtml extends React.Component {

  static displayName = 'PdfHtml';

  static propTypes = {
    html: PropTypes.string
  };

  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>Sweeter</title>
          <meta name="author" content="Kenny" />
          <meta name="viewport" content="width=device-width,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, initial-scale=1" />
          {configs.stylesheets.map(styleUrl =>
            <link key={styleUrl} href={`${configs.stylesPath}${styleUrl}`} rel="stylesheet" />
          )}
          <link href={assets.style} rel="stylesheet" />
        </head>
        <body dangerouslySetInnerHTML={{ __html: this.props.html }}></body>
      </html>
    );
  }
}
