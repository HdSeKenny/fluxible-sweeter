import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import 'babel-polyfill';
import openSocket from 'socket.io-client';
// import './polyfills';
import { Custom } from './components';
import createRoutes from './routes';
import app from './app';
import fetchData from './utils/fetchData';
import indexedDB from './utils/indexedDB';
import './public/styles/main.less';

const socket = openSocket.connect();

window.React = React;
window.socket = socket;

const dehydratedState = window.__DATA__;
let firstRender = true;

// const dehydratedStores = dehydratedState.context.dispatcher.stores;
indexedDB.init()
  .then(() => {
    // Check if it should clear the indexedDB
    indexedDB.checkIndexedDBClear();

    app.rehydrate(dehydratedState, (err, context) => {
      if (err) {
        throw err;
      }
      window.context = context;

      // const _dispatcherStores = app._dispatcher.stores;
      // const fluxibleStores = Object.keys(_dispatcherStores).map(key => {
      //   return context.getStore(key);
      // });

      const routes = createRoutes(context);
      const scrollRoutes = ['list', 'about', ':blogId/details', ':username'];
      function UpdateRoute() {
        if (!firstRender) {
          fetchData(context, this.state);
        }
        firstRender = false;
        const targetPath = this.state.routes[1].path;
        if (!targetPath || scrollRoutes.includes(targetPath) && this.state.routes.length < 3) {
          window.scrollTo(0, 0);
        }
      }

      ReactDOM.render(
        React.createElement(
          Custom, { context: context.getComponentContext() },
          React.createElement(Router, {
            history: browserHistory,
            children: routes,
            onUpdate: UpdateRoute
          })
        ),
        document.getElementById('main')
      );
    });
  })
  .catch((initError) => {
    // eslint-disable-next-line no-console
    console.log('initError', initError);
  });
