'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var classSet = require('classnames');
var Overlay = React.createClass({

    displayName: 'Overlay',

    _originalBodyOverflow: '',

    propTypes: {
        autoLockScrolling: React.PropTypes.bool,
        show: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            autoLockScrolling: true
        };
    },
    componentDidMount: function () {
        this._originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
    },
    componentDidUpdate: function () {
        if (this.props.autoLockScrolling) this.props.show ? this._preventScrolling() : this._allowScrolling();
    },
    componentWillUnmount: function () {
        this._allowScrolling();
    },


    getClassName: function () {
        return classSet({
            'overlay': true,
            'overlay-show': this.props.show
        });
    },
    preventScrolling: function () {
        if (!this.props.autoLockScrolling) this._preventScrolling();
    },
    allowScrolling: function () {
        if (!this.props.autoLockScrolling) this._allowScrolling();
    },
    _preventScrolling: function () {
        let body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'hidden';
    },
    _allowScrolling: function () {
        let body = document.getElementsByTagName('body')[0];
        body.style.overflow = this._originalBodyOverflow || '';
    },
    render: function () {
        var className = this.getClassName();
        return React.createElement('div', _extends({}, this.props, {
            className: className
        }));
    }
});

module.exports = Overlay;
