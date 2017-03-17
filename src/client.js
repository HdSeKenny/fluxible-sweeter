import 'babel-polyfill'
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import CustomFluxibleComponent from'./components/CustomFluxibleComponent';
// import createBrowserHistory from 'history/lib/createBrowserHistory'
import createRoutes from './routes';
import app from './app';
import fetchData from './utils/fetchData';
// let history = createBrowserHistory();
window.React = React;

let dehydratedState = window.__DATA__;
let firstRender = true;

// app.getPlugin('ReactRouterPlugin').setHistory(browserHistory);

app.rehydrate(dehydratedState, (err, context)=> {
    if (err) {
        throw err;
    }
    window.context = context;
    let routes = createRoutes(context);
    ReactDOM.render(
        React.createElement(
            CustomFluxibleComponent,
            {context: context.getComponentContext()},
            React.createElement(Router, {
                history: browserHistory,
                children: routes,
                onUpdate: UpdateRoute
            })
        ),
        document.getElementById('main')
    );
    function UpdateRoute() {
        if (!firstRender) {
            fetchData(context, this.state);
        }
        firstRender = false;
    }
});
