var React = require('react');
var classSet = require('classnames');

var BgIcon = React.createClass({

    getClassName: function () {
        return classSet({
            'bg-icon': true,
        }, this.props.iconClassName, this.props.className)
    },

    render: function () {
        var className = this.getClassName();
        return (
            <span
                {...this.props}
                className={className}
                >
                {this.props.children}
            </span>
        );
    }
});

module.exports = BgIcon;
