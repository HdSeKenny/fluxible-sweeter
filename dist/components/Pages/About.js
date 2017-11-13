'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Layout = require('../UI/Layout');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var About = function (_React$Component) {
  (0, _inherits3.default)(About, _React$Component);

  function About() {
    (0, _classCallCheck3.default)(this, About);

    var _this = (0, _possibleConstructorReturn3.default)(this, (About.__proto__ || (0, _getPrototypeOf2.default)(About)).call(this));

    _this.state = {
      commits: [],
      getCommitErr: ''
    };
    return _this;
  }

  (0, _createClass3.default)(About, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var logsStr = localStorage.getItem('sweeter_logs');
      var logs = void 0;
      var lastLogDate = void 0;
      if (logsStr) {
        logs = JSON.parse(logsStr);
        lastLogDate = logs[0].commit.author.date;
        this.setState({
          commits: logs
        });
      } else {
        this.getCommitsInfo(logs, lastLogDate);
      }

      setInterval(function () {
        _this2.getCommitsInfo(logs, lastLogDate);
      }, 24 * 60 * 60 * 1000);
    }
  }, {
    key: 'getCommitsInfo',
    value: function getCommitsInfo(logs, lastLogDate) {
      var _this3 = this;

      $.get("/api/github/commits").done(function (data) {
        var newCommitDate = data[0].commit.author.date;
        if (newCommitDate === lastLogDate) {
          _this3.setState({
            commits: logs || data
          });
        } else {
          _this3.setState({
            commits: data.slice(0, 9)
          }, function () {
            var logs = data.slice(0, 9);
            localStorage.setItem('sweeter_logs', (0, _stringify2.default)(logs));
          });
        }
      }).fail(function (err) {
        _this3.setState({
          getCommitErr: 'Get logs info error'
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          commits = _state.commits,
          getCommitErr = _state.getCommitErr;

      return _react2.default.createElement(
        'div',
        { className: 'about' },
        _react2.default.createElement(
          'div',
          { className: 'block' },
          _react2.default.createElement(
            _Layout.Row,
            null,
            _react2.default.createElement(
              _Layout.Col,
              { size: '6' },
              _react2.default.createElement(
                'h2',
                { className: 'title' },
                'About sweeter'
              ),
              _react2.default.createElement(
                'p',
                null,
                'This application is a simple blog website, built with basic knowleadge of react and node.'
              ),
              _react2.default.createElement(
                'p',
                null,
                'The style of this website imitates sina ',
                _react2.default.createElement(
                  'a',
                  { href: 'https://weibo.com' },
                  'weibo.com'
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                'Details and source code is on github: ',
                _react2.default.createElement(
                  'a',
                  { href: 'https://github.com/HdSeKenny/fluxible-sweeter' },
                  'fluxible-sweeter'
                )
              )
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '6' },
              _react2.default.createElement(
                'h2',
                { className: 'title' },
                'Develop logs'
              ),
              commits.map(function (commitObj, index) {
                var html_url = commitObj.html_url,
                    commit = commitObj.commit;
                var author = commit.author,
                    message = commit.message;

                var date = _utils.format.fromNow(author.date);
                return _react2.default.createElement(
                  'div',
                  { className: 'log-section', key: index },
                  _react2.default.createElement(
                    'a',
                    { href: html_url, target: '_blank' },
                    _react2.default.createElement(
                      'p',
                      { className: 'message' },
                      _react2.default.createElement(
                        'strong',
                        null,
                        '"',
                        message,
                        '"'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: 'author' },
                    _react2.default.createElement(
                      'small',
                      null,
                      author.name,
                      ', ',
                      date
                    )
                  )
                );
              }),
              getCommitErr && _react2.default.createElement(
                'p',
                { className: 'help-block' },
                getCommitErr
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'block' },
          _react2.default.createElement(
            'h3',
            { className: 'title' },
            'About me'
          ),
          _react2.default.createElement('p', null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'block' },
          _react2.default.createElement(
            'h3',
            { className: 'title' },
            'About me'
          ),
          _react2.default.createElement('p', null)
        )
      );
    }
  }]);
  return About;
}(_react2.default.Component);

About.displayName = 'About';
exports.default = About;
module.exports = exports['default'];