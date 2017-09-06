import express from 'express';
import session from 'express-session';
import useragent from 'express-useragent';
import connectMongo from 'connect-mongo';
import path from 'path';
import cors from 'cors';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import serialize from 'serialize-javascript';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Custom } from './components';
import { blogs, users, comments } from './services';
import createRoutes from './routes';
import fetchData from './utils/fetchData';
import app from './app';
import Html from './components/Html';
import assets from './utils/assets';
import configs from './configs';
import htmlToPdf from './plugins/htmlToPdf';
import sharp from './plugins/sharp';

export default (server) => {
  const env = server.get('env');

  server.set('views', path.join(__dirname, 'views')); // view engine setup
  server.set('view engine', 'pug');

  if (configs.server.logEnable && env !== 'production') {
    // server.use(morgan(':date[iso] :method :url :status :response-time ms'));
    server.use(morgan(':method :url :status :response-time ms'));
  }

  if (env === 'development') {
    server.use(express.static(path.join('..', 'dev')));
  }

  server.use(bodyParser.json({ limit: '20mb' }));
  server.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  server.use(cookieParser());
  server.use(cors());

  server.use(`${configs.path_prefix}/`, express.static(path.join(__dirname, 'public')));
  server.use(favicon(`${__dirname}/public/styles/images/favicon.ico`));
  server.use(useragent.express());

  const MongoStore = connectMongo(session);
  server.use(session({
    secret: 'sweeter-secret',
    store: new MongoStore(configs.mongo.session),
    resave: false,
    saveUninitialized: false
  }));

  const fetchrPlugin = app.getPlugin('FetchrPlugin');
  fetchrPlugin.registerService(blogs);
  fetchrPlugin.registerService(users);
  fetchrPlugin.registerService(comments);

  server.use('/api/upload', require('./plugins/upload'));
  server.use('/api/download', htmlToPdf);
  server.use('/api/resize', sharp);

  server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

  server.use((req, res) => {
    const context = app.createContext({
      req,
      res,
      configs,
      authenticated: req.session.user && req.session.user.authenticated
    });
    const routes = createRoutes(context);

    match({ routes, location: req.url }, (error, redirectLocation, routerState) => {
      if (error) {
        res.send(500, error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (routerState) {
        fetchData(context, routerState, (err) => {
          if (err) throw err;
          const exposed = `window.__DATA__=${serialize(app.dehydrate(context))}`;
          const doctype = '<!DOCTYPE html>';
          const markup = renderToString(React.createElement(
            Custom, { context: context.getComponentContext() }, <RouterContext {...routerState} />
          ));
          const html = renderToStaticMarkup(<Html assets={assets} markup={markup} exposed={exposed} />);

          res.send(doctype + html);
        });
      }
      else {
        res.send(404, 'Not found');
      }
    });
  });
};