var React = require('react');
var classSet = require('classnames');
var Overlay = React.createClass({

    displayName: 'Overlay',

    _originalBodyOverflow: '',

    propTypes: {
        autoLockScrolling: React.PropTypes.bool,
        show: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {
            autoLockScrolling: true,
        };
    },

    componentDidMount() {
        this._originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
    },

    componentDidUpdate() {
        if (this.props.autoLockScrolling) (this.props.show) ? this._preventScrolling() : this._allowScrolling();
    },

    componentWillUnmount() {
        this._allowScrolling();
    },

    getClassName: function () {
        return classSet({
            'overlay': true,
            'overlay-show': this.props.show
        })
    },
    preventScrolling() {
        if (!this.props.autoLockScrolling) this._preventScrolling();
    },

    allowScrolling() {
        if (!this.props.autoLockScrolling) this._allowScrolling();
    },

    _preventScrolling() {
        let body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'hidden';
    },

    _allowScrolling() {
        let body = document.getElementsByTagName('body')[0];
        body.style.overflow = this._originalBodyOverflow || '';
    },

    render() {
        var className = this.getClassName();
        return (
            <div
                {...this.props}
                className={className}
                >
            </div>
        );
    }
});

module.exports = Overlay;
