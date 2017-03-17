const md5 = require('md5');
const mongdb = require('mongodb');

const seed = {
  blogs: [{
    "_id": mongdb.ObjectID("584a75341e8a6c8b80c9da7d"),
    "strId": "584a75341e8a6c8b80c9da7d",
    "content": "This a test microblog !",
    "created_at": "2016-12-09T09:11:16.354Z",
    "type": "microblog",
    "author": mongdb.ObjectID("583ff3d6a193d70f6946948e"),
    "show_comments": false,
    "likers": [],
    "comments": []
    }, {
    "_id": mongdb.ObjectID("584a75341e8a6c8b80c9da7e"),
    "strId": "584a75341e8a6c8b80c9da7e",
    "title": "<< Today is a good day >>",
    "content": "My name is kenny...",
    "created_at": "2016-12-09T09:11:16.354Z",
    "type": "article",
    "author": mongdb.ObjectID("583ff3d6a193d70f6946948e"),
    "show_comments": false,
    "likers": [],
    "comments": []
  }],
  user: {
    "_id": mongdb.ObjectID("583ff3d6a193d70f6946948e"),
    "strId": "583ff3d6a193d70f6946948e",
    "firstName": "Kuan",
    "lastName": "Lu",
    "username": "Kenny",
    "email": "test@test.com",
    "birthday": "1991/12/20",
    "phone": "13918544928",
    "profession": "Web Developer",
    "password": md5("test"),
    "image_url": "/images/kuan.jpg",
    "background_image_url": "/images/users/user-center-bg.jpg",
    "blogs": ["584a75341e8a6c8b80c9da7d", "584a75341e8a6c8b80c9da7e"],
    "focuses": [],
    "fans": []
  }
}

module.exports = seed;