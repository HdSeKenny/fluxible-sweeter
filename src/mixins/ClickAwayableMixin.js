import React from 'react';
import ReactDOM from 'react-dom'
import Events from '../utils/events';
import Dom from '../utils/dom';

module.exports = {

    //When the component mounts, listen to click events and check if we need to
    //Call the componentClickAway function.
    componentDidMount() {
        if (!this.manuallyBindClickAway) this._bindClickAway();
    },

    componentWillUnmount() {
        this._unbindClickAway();
    },

    _checkClickAway(event) {
        // workround for DIT-164
        if (!this.isMounted()) {
            return;
        }
        
        let el = ReactDOM.findDOMNode(this);

        // Check if the target is inside the current component
        if (event.target !== el &&
            !Dom.isDescendant(el, event.target) &&
            document.documentElement.contains(event.target)) {
            if (this.componentClickAway) this.componentClickAway();
        }
    },

    _bindClickAway() {
        // On touch-enabled devices, both events fire, and the handler is called twice,
        // but it's fine since all operations for which the mixin is used
        // are idempotent.
        Events.on(document, 'click', this._checkClickAway);
    },

    _unbindClickAway() {
        Events.off(document, 'click', this._checkClickAway);
    },

};
