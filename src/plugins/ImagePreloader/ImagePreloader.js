import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class ImagePreloader extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  onImageLoaded() {
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 500);
  }

  render() {
    const { loaded } = this.state;
    const { className, src } = this.props;
    const classImage = classNames(className, 'lt-image', { '_loaded': loaded });
    return (
      <div className={classImage} >
        <img className="preload" src={src.preload} alt="preload" />
        <img className="content" src={src.content} alt="content" onLoad={this.onImageLoaded.bind(this)} />
      </div>
    );
  }
}
