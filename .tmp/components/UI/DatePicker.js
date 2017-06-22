'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _datetime = require('../../utils/datetime');

var _datetime2 = _interopRequireDefault(_datetime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DatePicker = (0, _createReactClass2.default)({

    propTypes: {
        datetype: _propTypes2.default.array,
        maxage: _propTypes2.default.number
    },

    getDefaultProps: function () {
        return {
            datetype: ['month', 'day', 'year'],
            maxage: 100
        };
    },
    getInitialState: function () {
        return {
            month: this.props.month,
            year: this.props.year,
            day: this.props.day
        };
    },
    getClassName: function () {
        return (0, _classnames2.default)({
            'datepicker': true
        });
    },
    render: function () {
        var className = this.getClassName();
        return _react2.default.createElement(
            'div',
            { className: className },
            this.renderSelect()
        );
    },
    renderSelect: function () {
        var selectors = this.props.datetype.map((type, index) => {
            return this['render' + type]();
        });
        return selectors;
    },
    getValue: function () {
        if (isNaN(this.state.year) || isNaN(this.state.month) || isNaN(this.state.day)) {
            return "";
        } else {
            var date = new Date(this.state.year, this.state.month, this.state.day);
            return date.format('mmddyyyy');
        }
    },
    onMonthChange: function (e) {
        var month = e.target.value;
        this.props.onChangeMonth({
            month: month
        });
    },
    onDayChange: function (e) {
        var day = e.target.value;
        this.props.onChangeDay({
            day: day
        });
    },
    onYearChange: function (e) {
        var year = e.target.value;
        this.props.onChangeYear({
            year: year
        });
    },
    rendermonth: function () {
        var options = [];
        options.push(_react2.default.createElement(
            'option',
            { key: 'placeholder' },
            'Month'
        ));
        for (var i = 1; i < 13; i++) {
            options.push(_react2.default.createElement(
                'option',
                { key: i, value: i },
                _datetime2.default.getFullMonth(i)
            ));
        }
        return _react2.default.createElement(
            'select',
            { key: 'month', className: 'form-control form-fields-input', ref: 'month', value: this.state.month,
                onChange: this.onMonthChange },
            options
        );
    },
    renderday: function () {
        var options = [];
        options.push(_react2.default.createElement(
            'option',
            { key: 'placeholder' },
            'Day'
        ));
        for (var i = 0; i < 31; i++) {
            options.push(_react2.default.createElement(
                'option',
                { key: i, value: i + 1 },
                i + 1
            ));
        }
        return _react2.default.createElement(
            'select',
            { key: 'day', className: 'form-control form-fields-input', ref: 'day', value: this.state.day,
                onChange: this.onDayChange },
            options
        );
    },
    renderyear: function () {
        var maxYear = new Date().getFullYear();
        var options = [];
        options.push(_react2.default.createElement(
            'option',
            { key: 'placeholder' },
            'Year'
        ));
        for (var i = 0; i < this.props.maxage; i++) {
            options.push(_react2.default.createElement(
                'option',
                { key: i, value: maxYear - i },
                maxYear - i
            ));
        }
        return _react2.default.createElement(
            'select',
            { key: 'year', className: 'form-control form-fields-input', ref: 'years', value: this.state.year,
                onChange: this.onYearChange },
            options
        );
    }
});

module.exports = DatePicker;
