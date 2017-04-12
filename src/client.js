import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import 'babel-polyfill';
import 'bootstrap/dist/js/bootstrap';
import './polyfills';
import CustomFluxibleComponent from './components/CustomFluxibleComponent';
import createRoutes from './routes';
import app from './app';
import fetchData from './utils/fetchData';
import './public/styles/main.less';

window.React = React;

const dehydratedState = window.__DATA__;
let firstRender = true;

app.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }
  window.context = context;

  const routes = createRoutes(context);

  function UpdateRoute() {
    if (!firstRender) {
      fetchData(context, this.state);
    }
    firstRender = false;
  }

  ReactDOM.render(
    React.createElement(
      CustomFluxibleComponent, { context: context.getComponentContext() },
      React.createElement(Router, {
        history: browserHistory,
        children: routes,
        onUpdate: UpdateRoute
      })
    ),
    document.getElementById('main')
  );
});
