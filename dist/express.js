'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _expressUseragent = require('express-useragent');

var _expressUseragent2 = _interopRequireDefault(_expressUseragent);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _components = require('./components');

var _services = require('./services');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _fetchData = require('./utils/fetchData');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _Html = require('./components/Html');

var _Html2 = _interopRequireDefault(_Html);

var _assets = require('./utils/assets');

var _assets2 = _interopRequireDefault(_assets);

var _configs = require('./configs');

var _configs2 = _interopRequireDefault(_configs);

var _htmlToPdf = require('./plugins/htmlToPdf');

var _htmlToPdf2 = _interopRequireDefault(_htmlToPdf);

var _sharp = require('./plugins/sharp');

var _sharp2 = _interopRequireDefault(_sharp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (server) {
  var env = server.get('env');

  server.set('views', _path2.default.join(__dirname, 'views')); // view engine setup
  server.set('view engine', 'pug');

  if (_configs2.default.server.logEnable && env !== 'production') {
    // server.use(morgan(':date[iso] :method :url :status :response-time ms'));
    server.use((0, _morgan2.default)(':method :url :status :response-time ms'));
  }

  if (env === 'development') {
    server.use(_express2.default.static(_path2.default.join(__dirname, '..', '.tmp')));
  }

  server.use(_bodyParser2.default.json({ limit: '20mb' }));
  server.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
  server.use((0, _cookieParser2.default)());
  server.use((0, _cors2.default)());

  server.use(_configs2.default.path_prefix + '/', _express2.default.static(_path2.default.join(__dirname, '..', 'lib')));
  server.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, '..', 'lib') + '/images/favicon.ico'));
  server.use(_expressUseragent2.default.express());

  var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
  server.use((0, _expressSession2.default)({
    secret: 'sweeter-secret',
    store: new MongoStore(_configs2.default.mongo.session),
    resave: false,
    saveUninitialized: false
  }));

  var fetchrPlugin = _app2.default.getPlugin('FetchrPlugin');
  fetchrPlugin.registerService(_services.blogs);
  fetchrPlugin.registerService(_services.users);
  fetchrPlugin.registerService(_services.comments);

  server.use('/api/upload', require('./plugins/upload'));
  server.use('/api/download', _htmlToPdf2.default);
  server.use('/api/resize', _sharp2.default);

  server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

  server.use(function (req, res) {
    var context = _app2.default.createContext({
      req: req,
      res: res,
      configs: _configs2.default,
      authenticated: req.session.user && req.session.user.authenticated
    });
    var routes = (0, _routes2.default)(context);

    (0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, routerState) {
      if (error) {
        res.send(500, error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (routerState) {
        (0, _fetchData2.default)(context, routerState, function (err) {
          if (err) throw err;
          var exposed = 'window.__DATA__=' + (0, _serializeJavascript2.default)(_app2.default.dehydrate(context));
          var doctype = '<!DOCTYPE html>';
          var markup = (0, _server.renderToString)(_react2.default.createElement(_components.Custom, { context: context.getComponentContext() }, _react2.default.createElement(_reactRouter.RouterContext, routerState)));
          var html = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_Html2.default, { assets: _assets2.default, markup: markup, exposed: exposed }));

          res.send(doctype + html);
        });
      } else {
        res.send(404, 'Not found');
      }
    });
  });
};

module.exports = exports['default'];