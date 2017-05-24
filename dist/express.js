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

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _fetchData = require('./utils/fetchData');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _CustomFluxibleComponent = require('./components/CustomFluxibleComponent');

var _CustomFluxibleComponent2 = _interopRequireDefault(_CustomFluxibleComponent);

var _services = require('./services');

var _Html = require('./components/Html');

var _Html2 = _interopRequireDefault(_Html);

var _configs = require('./configs');

var _configs2 = _interopRequireDefault(_configs);

var _assets = require('./utils/assets');

var _assets2 = _interopRequireDefault(_assets);

var _server2 = require('./configs/server');

var _server3 = _interopRequireDefault(_server2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = server => {
  const env = server.get('env');

  // view engine setup
  server.set('views', _path2.default.join(__dirname, 'views'));
  server.set('view engine', 'pug');

  if (_server3.default.server.logEnable && env !== 'production') {
    // server.use(morgan(':date[iso] :method :url :status :response-time ms'));
    server.use((0, _morgan2.default)(':method :url :status :response-time ms'));
  }
  if (env === 'development') {
    server.use(_express2.default.static(_path2.default.join(_server3.default.server.root, '.tmp')));
  }

  // limit size of json object less than 20M for extracting metadata
  server.use(_bodyParser2.default.json({ limit: '20mb' }));

  // limit size of json object less than 20M for extracting metadata
  server.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
  server.use((0, _cookieParser2.default)());
  server.use((0, _serveFavicon2.default)(`${__dirname}/public/styles/images/favicon.ico`));
  server.use((0, _cors2.default)());
  server.use(`${_configs2.default.path_prefix}/`, _express2.default.static(_path2.default.join(__dirname, 'public')));
  server.use(_expressUseragent2.default.express());

  const MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
  server.use((0, _expressSession2.default)({
    secret: 'secret',
    store: new MongoStore(_server3.default.mongo.session),
    resave: false,
    saveUninitialized: false
  }));

  const fetchrPlugin = _app2.default.getPlugin('FetchrPlugin');
  // fetchrPlugin.registerService(LanguageService);
  fetchrPlugin.registerService(_services.blogs);
  fetchrPlugin.registerService(_services.users);
  fetchrPlugin.registerService(_services.comments);

  server.use('/api/upload', require('./plugins/upload'));
  server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());
  server.use((req, res) => {
    const context = _app2.default.createContext({
      req: req,
      res: res,
      config: _configs2.default,
      authenticated: req.session.user && req.session.user.authenticated
    });
    const routes = (0, _routes2.default)(context);

    (0, _reactRouter.match)({ routes: routes, location: req.url }, (error, redirectLocation, routerState) => {
      if (error) {
        res.send(500, error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (routerState) {
        (0, _fetchData2.default)(context, routerState, err => {
          if (err) {
            throw err;
          }
          const exposed = `window.__DATA__=${(0, _serializeJavascript2.default)(_app2.default.dehydrate(context))}`;
          const doctype = '<!DOCTYPE html>';
          const markup = (0, _server.renderToString)(_react2.default.createElement(_CustomFluxibleComponent2.default, { context: context.getComponentContext() }, _react2.default.createElement(_reactRouter.RouterContext, routerState)));
          const html = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_Html2.default, { assets: _assets2.default, markup: markup, exposed: exposed }));

          res.send(doctype + html);
        });
      } else {
        res.send(404, 'Not found');
      }
    });
  });
};
// import './polyfills';


module.exports = exports['default'];
