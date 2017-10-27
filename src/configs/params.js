const React = require('react');

module.exports = {
  brandImage: '/images/sweeter.png',
  navbar: {
    sticky_header_height: 250,
    fade_speed: 300
  },

  leftNav: {
    left_nav_height: 900,
    fade_speed: 300
  },
  showUserCard: false,
  showEmoji: false,
  emojiConfig: {
    theme: {
      emoji: 'emoji',
      emojiSuggestions: 'emojiSuggestions',
      emojiSuggestionsEntry: 'emojiSuggestionsEntry',
      emojiSuggestionsEntryFocused: 'emojiSuggestionsEntryFocused',
      emojiSuggestionsEntryText: 'emojiSuggestionsEntryText',
      emojiSuggestionsEntryIcon: 'emojiSuggestionsEntryIcon',
      emojiSelect: 'emojiSelect',
      emojiSelectButton: 'emojiSelectButton',
      emojiSelectButtonPressed: 'emojiSelectButtonPressed',
      emojiSelectPopover: 'emojiSelectPopover',
      emojiSelectPopoverClosed: 'emojiSelectPopoverClosed',
      emojiSelectPopoverTitle: 'emojiSelectPopoverTitle',
      emojiSelectPopoverGroups: 'emojiSelectPopoverGroups',
      emojiSelectPopoverGroup: 'emojiSelectPopoverGroup',
      emojiSelectPopoverGroupTitle: 'emojiSelectPopoverGroupTitle',
      emojiSelectPopoverGroupList: 'emojiSelectPopoverGroupList',
      emojiSelectPopoverGroupItem: 'emojiSelectPopoverGroupItem',
      emojiSelectPopoverToneSelect: 'emojiSelectPopoverToneSelect',
      emojiSelectPopoverToneSelectList: 'emojiSelectPopoverToneSelectList',
      emojiSelectPopoverToneSelectItem: 'emojiSelectPopoverToneSelectItem',
      emojiSelectPopoverEntry: 'emojiSelectPopoverEntry',
      emojiSelectPopoverEntryFocused: 'emojiSelectPopoverEntryFocused',
      emojiSelectPopoverEntryIcon: 'emojiSelectPopoverEntryIcon',
      emojiSelectPopoverNav: 'emojiSelectPopoverNav',
      emojiSelectPopoverNavItem: 'emojiSelectPopoverNavItem',
      emojiSelectPopoverNavEntry: 'emojiSelectPopoverNavEntry',
      emojiSelectPopoverNavEntryActive: 'emojiSelectPopoverNavEntryActive',
      emojiSelectPopoverScrollbar: 'emojiSelectPopoverScrollbar',
      emojiSelectPopoverScrollbarThumb: 'emojiSelectPopoverScrollbarThumb'
    },
    imagePath: '/emojione/svg/',
    selectGroups: [{
      title: 'People',
      icon: React.createElement('i', { className: 'fa fa-smile-o' }),
      categories: ['people']
    }, {
      title: 'Food & Drink',
      icon: React.createElement('i', { className: 'fa fa-cutlery' }),
      categories: ['food']
    }, {
      title: 'Symbols',
      icon: React.createElement('i', { className: 'fa fa-heart' }),
      categories: ['symbols']
    }]
  }
};
