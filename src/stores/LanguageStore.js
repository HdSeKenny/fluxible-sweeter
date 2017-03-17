import createStore from 'fluxible/addons/createStore';
// import store from '../utils/sessionStorage';
import _  from 'lodash';

/**
 * LanguageStore that supports:
 * 1) initial loading and update
 * s) rehydrate and dehydrate
 */
const LanguageStore = createStore({
    storeName: 'LanguageStore',
    handlers: {
        'LOAD_LANGUAGE': 'loadLanguage',
        'CHANGE_LANGUAGE': 'changeLanguage'
    },

    initialize() {
        this.language = null;
        this.save = null;
    },

    loadLanguage(res) {
        this.save = res.save;
        this.language = res.data;
        this.emitChange();
    },

    changeLanguage(res) {
        this.save = res.save;
        this.language = res.data;
        this.emitChange();
    },

    getLanguage() {
        return this.language;
    },

    dehydrate() {
        return {
            language: this.language,
            save: this.save
        };
    },

    rehydrate(state) {
        this.language = state.language;
        this.save = state.save;
        if (this.save) {
            store.set(decodeURIComponent(this.save.key), this.language, this.save.expired)
        }
    }
});

module.exports = LanguageStore;
