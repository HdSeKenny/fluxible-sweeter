import './polyfills';
import express from 'express';
import session from 'express-session';
import useragent from 'express-useragent';
import connectMongo from 'connect-mongo';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import serialize from 'serialize-javascript';
import cors from 'cors'
import React from 'react';
import { renderToString, renderToStaticMarkup }from 'react-dom/server';
import { match, RouterContext, Router} from 'react-router';
import createRoutes from './routes'
import fetchData from './utils/fetchData';
import app from './app';
import CustomFluxibleComponent from './components/CustomFluxibleComponent';
import {AuthActions} from './actions';
import {
    clientApi,
    // language as LanguageService,
    blogs as BlogService,
    users as UserService,
    comments as CommentService
} from './services';
import Html from './components/Html';
import config from './configs';
import assets from './utils/assets';
import Language from './utils/language';
import serverConfig from './configs/server';
import metadata from './plugins/metadata.js';
import MongoClient from 'mongodb';
import contra from 'contra';

const server = express();
const customContextTypes = {
    config: React.PropTypes.object,
};

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');
if (serverConfig.server.enableLog) {
  server.use(logger('dev'));
}
server.use(bodyParser.json({limit: '20mb'})); // limit size of json object less than 20M for extracting metadata
server.use(bodyParser.urlencoded({limit: '20mb', extended: false})); // limit size of json object less than 20M for extracting metadata
server.use(cookieParser());
server.use(favicon(__dirname + '/public/images/favicon.ico'));
server.use(cors());
server.use(config.path_prefix + '/health', function (req, res) {
    res.send('I am ok');
});
server.use(config.path_prefix + '/', express.static(path.join(__dirname, 'public')));
server.use(useragent.express());
require('./configs/routes')(server);

// when db is not avaliable,show error in the page
if(!global.dbIsAvaliable) {
  server.use(function (req, res) {
    res.render('error', { status: serverConfig.mongo.connectErrorMsg});
  });
}
else{
  var MongoStore = connectMongo(session);
  server.use(session({
    secret: 'secret',
    store: new MongoStore(serverConfig.mongo.session),
    resave: false,
    saveUninitialized: false
  }));

  var fetchrPlugin = app.getPlugin('FetchrPlugin');

  // fetchrPlugin.registerService(LanguageService);
  fetchrPlugin.registerService(BlogService);
  fetchrPlugin.registerService(UserService);
  fetchrPlugin.registerService(CommentService);

  server.use('/extractMetadata', metadata);
  server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());
  server.use((req, res, next) => {
    let context = app.createContext({
        req: req,
        res: res,
        config: config,
        authenticated: req.session.user && req.session.user.authenticated
    });
    let routes = createRoutes(context);
    match({routes, location: req.url}, (error, redirectLocation, routerState) => {
      if (error) {
        res.send(500, error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (routerState) {
        fetchData(context, routerState, (err) => {
          var exposed = 'window.__DATA__=' + serialize(app.dehydrate(context));
          var doctype = '<!DOCTYPE html>';
          var markup = renderToString(React.createElement(
            CustomFluxibleComponent,
            {context: context.getComponentContext()},
            <RouterContext {...routerState} />
          ));
          var html = renderToStaticMarkup(<Html assets={assets} markup={markup} exposed={exposed}/>)
          res.send(doctype + html);
        })
      } else {
        res.send(404, 'Not found')
      }
    });
  });
}

module.exports = server;
