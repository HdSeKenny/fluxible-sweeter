import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import 'babel-polyfill';
import openSocket from 'socket.io-client';
import serverConfig from './configs/sweeter';
// import './polyfills';
import { Custom } from './components';
import createRoutes from './routes';
import app from './app';
import fetchData from './utils/fetchData';
import './public/styles/main.less';

const chatSocket = openSocket.connect();

chatSocket.on('connect', () => {
  console.log('Chat socket is connected');
});

window.React = React;
window.chatSocket = chatSocket;

const dehydratedState = window.__DATA__;
let firstRender = true;

app.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }
  window.context = context;

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
