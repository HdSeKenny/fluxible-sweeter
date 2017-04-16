import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col } from './Layout';

export default class PinItem extends Component {

  static displayName = 'PinItem';

  static propTypes = {
    pin: React.PropTypes.object,
    index: React.PropTypes.number,
    onSelect: React.PropTypes.func
  };

  onViewPinItem() {
    const { pin } = this.props;
    this.props.onSelect(pin._id);
  }

  render() {
    const { pin } = this.props;
    const { author } = pin;
    const isMoment = pin.type === 'moment';
    const isArticle = pin.type === 'article';
    const fromNow = moment(pin.dateCreated).fromNow();
    return (
      <div className="pin">
        <section className="panel panel-default mb-20">
          <header className="panel-heading text-uc p-r">
            {isMoment &&
              <div>
                <span className="thumb-sm avatar pull-left mr-5">
                  <img alt="pin" src={author.avatar || ''} />
                </span>
                <strong className="author-name pt-5">{author.name}</strong>
                <span className="text-muted text-xs">{author.username} <small className="fr mt-2">{fromNow}</small></span>
              </div>
            }
            {isArticle && <span>{pin.title}<strong>{pin.description}</strong></span>}
            <hr />
          </header>
          <section className="panel-body">
            <span className="pin-image" onClick={() => this.onViewPinItem()}>
              <img alt="pin" src={pin.image_url} />
            </span>
          </section>
          <footer className="panel-footer">
            {isArticle &&
              <div>
                <span className="thumb-sm avatar pull-left mr-5">
                  <img alt="pin" src={author.avatar || ''} />
                </span>
                <strong className="author-name pt-5">{author.name}</strong>
                <span className="text-muted text-xs">{author.username}</span>
              </div>
            }
            <div className="panel-footer-icon pt-20">
              <Row>
                <Col size="3">
                </Col>
                <Col size="3" className="tar p-0">
                  <i className="fa fa-share" />
                  <span className="ml-10">3434</span>
                </Col>
                <Col size="3" className="tar p-0">
                  <i className="fa fa-comments-o" />
                  <span className="ml-10">3434</span>
                </Col>
                <Col size="3" className="tar p-0">
                  <i className="fa fa-thumbs-o-up" />
                  <span className="ml-10">{pin.thumbs}</span>
                </Col>
              </Row>
            </div>
          </footer>
        </section>
      </div>
    );
  }
}
