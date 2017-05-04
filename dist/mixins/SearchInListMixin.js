'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SearchInListMixin for Sortable items, this function works if any list meets below requirements:
 * 1) list-group-item is the class of each child element
 * 2) list-group-item-dispaly-text is the class of text element
 * 3) there could be multiple columns with structure: list-group-item > list-group-item-dispaly-text
 *
 * Notes:
 * 1) if you want to keep the search result after new render: call searchInList(listRef, searchText) inside componentDidUpdate()
 * 2) by default, it will search by state.searchText(refs.searchText), and itemList is the ref name of parent list item
 * 3) if you wish to use this feature multiple times in one page: 
 *     a. define different refs, like itemList, itemList2, itemList3
 *     b. call searchInList('itemList2', searchText)
 */

module.exports = {
    /**
     * the core function that performs searching    
     * @param  {string} listRef - refkey of the the list
     * @param  {string} searchText - the text to be matched
     */
    searchInList: function (listRef, searchText) {
        let listObj = this.refs[listRef];
        if (listObj) {
            let listDOM = _reactDom2.default.findDOMNode(listObj);
            let children = listDOM.getElementsByClassName('list-group-item');
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                let textChildren = child.getElementsByClassName('list-group-item-dispaly-text');
                if (!_.isEmpty(textChildren)) {
                    // there could be multiple columns with structure: list-group-item > list-group-item-dispaly-text
                    let match = false;
                    for (let p = 0; p < textChildren.length; p++) {
                        let text = textChildren[p].textContent || textChildren[p].innerText;
                        if (text.toLowerCase().includes(searchText)) {
                            match = true;
                            break;
                        }
                    }
                    child.style.display = match ? 'block' : 'none';
                }
            }
        }
    },

    /**
     * the function to be called when click 'x' or 'clear search' sign
     */
    _onRemoveSearchText: function () {
        this.setState({
            searchText: ''
        });
    },

    /**
     * the function to be called when typing anything
     */
    _onSearch: function () {
        let searchText = this.refs.searchBox.getValue();
        this.setState({
            searchText: searchText
        });
    },

    /**
     * the function that will trigger searchInList 
     * you may need to define custom itemList ref key when performing multiple search in one page
     */
    _searchInList: function () {
        this.state.searchText && this.searchInList('itemList', this.state.searchText.toLowerCase());
    }
};
