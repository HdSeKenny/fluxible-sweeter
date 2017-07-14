import Fluxible from 'fluxible';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import config from './configs';
import routes from './routes';

// import sessionStorage from './utils/sessionStorage';

import {
  BlogStore,
  UserStore,
  ErrorStore
} from './stores';

// init namespace for current App
// sessionStorage.setNamespace('sweeter');

const app = new Fluxible({ component: routes });

app.plug(fetchrPlugin({
  xhrPath: `${config.path_prefix}/api`,
  xhrTimeout: 30000
}));

app.plug(require('./plugins/cookie'));
app.plug(require('./plugins/config'));

app.registerStore(BlogStore);
app.registerStore(UserStore);
app.registerStore(ErrorStore);

export default app;
