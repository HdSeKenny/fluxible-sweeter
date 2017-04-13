import React, { Component } from 'react';
import moment from 'moment';

export default class PinItem extends Component {

  static displayName = 'PinItem';

  static propTypes = {
    pin: React.PropTypes.object,
    index: React.PropTypes.number,
    onSelect: React.PropTypes.func
  };

  onView() {
    const { pin } = this.props;
    this.props.onSelect(pin._id);
  }

  render() {
    const { pin } = this.props;
    const fromNow = moment(pin.dateCreated).fromNow();
    return (
      <div className="pin">
        <section className="panel panel-default m-b-lg">
          <header className="panel-heading text-uc p-r">
            {pin.title}<strong>{pin.description}</strong>
            <hr />
          </header>
          <section className="panel-body">
            <span href="#" onClick={() => this.onView()}>
              <img alt="pin" style={{ width: '100%' }} src={pin.image_url} />
            </span>
          </section>
          <footer className="panel-footer">
            <span className="thumb-sm avatar pull-left m-r-xs">
              <img alt="pin" src={pin.author.avatar ? pin.author.avatar : ''} />
            </span>
            <strong className="d-b">{pin.author.name}</strong>
            <span className="text-muted text-xs">{fromNow}</span>
          </footer>
        </section>
      </div>
    );
  }
}
