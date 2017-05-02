import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import {Link} from 'react-router';
import {Button, Glyphicon} from 'react-bootstrap';

const Tabs = React.createClass({

    displayName: 'Tabs',
    
    propTypes: {
      selected: React.PropTypes.number,
      children: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.element
      ]).isRequired
    },

    getDefaultProps() {
      return{
        selected: 0
      }
    },

    getInitialState() {
      return{
        selected: this.props.selected
      }
    },

    _renderTitles() {
      function labels(child, index) {
        let activeClass = (this.state.selected === index ? 'active' : '');
        return (
          <li key={index} className={activeClass} >
            <Link to="#" onClick={this.handleClick.bind(this, index)}>
              {child.props.label}
            </Link>
          </li>
        )
      }

      return (
        <ul className="tabs-labels">
            {this.props.children.map(labels.bind(this))}
        </ul>
      )
    },

    _renderContent() {
      return (
        <div className="tabs-content">
          {this.props.children[this.state.selected]}
        </div>
      )
    },

    handleClick(index, event) {
      event.preventDefault();
      this.setState({
        selected: index
      })
    },

    render() {
        return (
          <div className="user-tabs">
              {this._renderTitles()}
              {this._renderContent()}
          </div>
        );
    }
});

export default Tabs;
