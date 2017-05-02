'use strict';

const md5 = require('md5');
const mongdb = require('mongodb');

const seed = {
  blogs: [{
    '_id': mongdb.ObjectID('584a75341e8a6c8b80c9da7d'),
    'id_str': '584a75341e8a6c8b80c9da7d',
    'text': 'This a test microblog !',
    'created_at': '2016-12-09T09:11:16.354Z',
    'description': '',
    'type': 'moment',
    'author': mongdb.ObjectID('583ff3d6a193d70f6946948e'),
    'show_comments': false,
    'tag': 'moment',
    'likers': [],
    'comments': [],
    'images': []
  }, {
    '_id': mongdb.ObjectID('584a75341e8a6c8b80c9da7e'),
    'id_str': '584a75341e8a6c8b80c9da7e',
    'title': 'Today is a good day',
    'text': 'My name is kenny...',
    'created_at': '2016-12-09T09:11:16.354Z',
    'description': '',
    'type': 'article',
    'author': mongdb.ObjectID('583ff3d6a193d70f6946948e'),
    'show_comments': false,
    'tag': 'life',
    'likers': [],
    'comments': [],
    'images': []
  }, {
    '_id': mongdb.ObjectID('584a75341e8a6c8b20c9da7e'),
    'id_str': '584a75341e8a6c8b20c9da7e',
    'title': 'Using React with Webpack Tutorial',
    'text': 'My name is kenny...',
    'created_at': '2016-12-09T12:11:16.354Z',
    'description': '',
    'type': 'article',
    'author': mongdb.ObjectID('583ff3d6a193d70f6946948e'),
    'show_comments': false,
    'tag': 'life',
    'likers': [],
    'comments': []
  }],
  user: {
    '_id': mongdb.ObjectID('583ff3d6a193d70f6946948e'),
    'id_str': '583ff3d6a193d70f6946948e',
    'firstName': 'Kuan',
    'lastName': 'Lu',
    'username': 'Kenny',
    'email': 'test@test.com',
    'birthday': '1991/12/20',
    'phone': '13918544928',
    'profession': 'Web Developer',
    'password': md5('test'),
    'image_url': '/styles/images/kuan.jpg',
    'background_image_url': '/styles/images/users/user-center-bg.jpg',
    'blogs': ['584a75341e8a6c8b80c9da7d', '584a75341e8a6c8b80c9da7e', '584a75341e8a6c8b20c9da7e'],
    'focuses': [],
    'fans': []
  }
};

module.exports = seed;
