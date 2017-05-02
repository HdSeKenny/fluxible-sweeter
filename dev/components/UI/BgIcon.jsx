'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var classSet = require('classnames');

var BgIcon = React.createClass({
    displayName: 'BgIcon',


    getClassName: function () {
        return classSet({
            'bg-icon': true
        }, this.props.iconClassName, this.props.className);
    },

    render: function () {
        var className = this.getClassName();
        return React.createElement(
            'span',
            _extends({}, this.props, {
                className: className
            }),
            this.props.children
        );
    }
});

module.exports = BgIcon;
