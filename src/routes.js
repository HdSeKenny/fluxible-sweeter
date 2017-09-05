import React from 'react';
import { Route, IndexRoute, History } from 'react-router';
import config from './configs';
import Mode from './configs/mode';
import env from './utils/env';
import { UserActions } from './actions';
import { UserFollows, UserPhotos } from './components/Users';
import {
  App,
  NotFound,
  Home,
  AddBlog,
  Details,
  UserHome,
  UserBlogs,
  UserInfo,
  ChangePassword,
  UserMore,
  UserMessages,
  List,
  UserMoments,
  About
} from './components';

const path = config.path_prefix === '' ? '/' : config.path_prefix;
const { isPublic } = Mode;

const createRoutes = (context) => {
  const requireLogin = (nextState, replace, cb) => {
    // do nothing for public visists
    if (isPublic) {
      cb();
      return;
    }

    // only load session to store on server side for isNotPublic visits
    if (env.is_server) {
      context.executeAction(UserActions.LoadKennyUser).then(() => {
        cb();
      });

      context.executeAction(UserActions.LoadSessionUser).then(() => {
        cb();
      });
    } else {
      cb();
    }
  };

  return (
    <Route history={History} component={App} path={path} onEnter={requireLogin}>
      <IndexRoute component={Home} />
      <Route path="/" component={Home} />
      <Route path="list" component={List} />
      <Route path="about" component={About} />

      <Route path=":blogId/details" component={Details} />
      <Route path=":username" component={UserHome} >
        <IndexRoute component={UserMoments} />
        <Route path="mine" component={UserBlogs} />
        <Route path="create" component={AddBlog} />
      </Route>

      <Route path=":username/Personal" component={UserInfo} />
      <Route path=":username/changepassword" component={ChangePassword} />

      <Route path=":username/more" component={UserMore} />
      <Route path=":username/messages" component={UserMessages} />
      <Route path=":username/follows" component={UserFollows} />
      <Route path=":username/photos" component={UserPhotos} />

      <Route path="*" component={NotFound} />
    </Route>
  );
};

module.exports = createRoutes;
