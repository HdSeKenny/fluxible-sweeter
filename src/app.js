import Fluxible from 'fluxible';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import config from './configs';
// import sessionStorage from './utils/sessionStorage';
import {
  // LanguageStore,
  BlogStore,
  UserStore,
  ErrorStore
} from './stores';

// init namespace for current App
// sessionStorage.setNamespace('di_quattro_metadata_explorer');

let app = new Fluxible({
  component: require('./routes')
});

app.plug(fetchrPlugin({
  xhrPath: config.path_prefix + '/api',
  xhrTimeout: 30000
}));

app.plug(require('./plugins/cookie'));
app.plug(require('./plugins/language'));
app.plug(require('./plugins/config'));
// app.plug(require('./plugins/customFetchrPlugin'));

// app.registerStore(LanguageStore);
app.registerStore(BlogStore);
app.registerStore(UserStore);
app.registerStore(ErrorStore);

export default app;
