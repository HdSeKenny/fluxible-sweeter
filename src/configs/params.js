const React = require('react');

module.exports = {
  navbar: {
    sticky_header_height: 250,
    fade_speed: 300
  },

  leftNav: {
    left_nav_height: 900,
    fade_speed: 300
  },
  showUserCard: false,
  showEmoji: true,
  emojiConfig: {
    imagePath: '/assets/emojione/svg/',
    selectGroups: [{
      title: 'People',
      icon: React.createElement('i', { className: 'fa fa-smile-o' }),
      categories: ['people'],
    }, {
      title: 'Food & Drink',
      icon: React.createElement('i', { className: 'fa fa-cutlery' }),
      categories: ['food'],
    }, {
      title: 'Symbols',
      icon: React.createElement('i', { className: 'fa fa-heart' }),
      categories: ['symbols'],
    }]
  }
};