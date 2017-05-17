import React, { PropTypes, Component } from 'react';
import { Row, Col } from '../UI/Layout';

export default class HomeRightNav extends Component {

  static displayName = 'HomeRightNav';

  static contextTypes = {
    executeAction: PropTypes.func
  };

  static propTypes = {
    location: PropTypes.object,
    path: PropTypes.string,
    currentUser: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser
    };
  }

  isActive(route) {
    console.log(this.props.path);
    return route === this.props.path ? 'active' : '';
  }

  render() {

    return (
      <div className="home-right-nav mb-20">
        <Row>
          <Col size="6 pl-0">
            <button className={"btn btn-default " + this.isActive('/Kenny/home')}>Moments</button>
            <button className="btn btn-default">Articles</button>
            <button className="btn btn-default">Mine</button>
          </Col>
          <Col size="3 pl-0 home-search">
            <input type="text" className="form-control" />
          </Col>
          <Col size="3 pr-0 tar">
            <button className="btn btn-info sweet-btn">Sweet</button>
            <button className="btn btn-primary sweet-btn ml-10">Article</button>
          </Col>
        </Row>
      </div>
    );
  }
}

