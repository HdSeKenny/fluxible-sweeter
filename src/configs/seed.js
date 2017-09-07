/* eslint-disable all, quotes */
const mongdb = require('mongodb');

const seed = {
  blogs: [{
    "_id": mongdb.ObjectID("59af686ea22f3d43182fe3a8"),
    "id_str": "59af686ea22f3d43182fe3a8",
    "text": "This is a test blog ... 😀 😀 😀 ",
    "content": {
      "entityMap": {
        "0": {
          "type": "emoji",
          "mutability": "IMMUTABLE",
          "data": {
            "emojiUnicode": "😀"
          }
        },
        "1": {
          "type": "emoji",
          "mutability": "IMMUTABLE",
          "data": {
            "emojiUnicode": "😀"
          }
        },
        "2": {
          "type": "emoji",
          "mutability": "IMMUTABLE",
          "data": {
            "emojiUnicode": "😀"
          }
        }
      },
      "blocks": [{
        "key": "6qdc0",
        "text": "This is a test blog ... 😀 😀 😀 ",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [
          {
            "offset": 24,
            "length": 1,
            "key": 0
          },
          {
            "offset": 26,
            "length": 1,
            "key": 1
          },
          {
            "offset": 28,
            "length": 1,
            "key": 2
          }
        ],
        "data": {}
      }]
    },
    "created_at": "2017-09-06T03:15:58.517Z",
    "type": "moment",
    "author": mongdb.ObjectID("583ff3d6a193d70f6946948e"),
    "show_comments": false,
    "likers": [],
    "comments": [],
    "tags": [],
    "images": [
      "/styles/images/sliders/great-frontend.png"
    ]
  }, {
    "_id": mongdb.ObjectID("59af645ecb50fd0a3c118ae9"),
    "id_str": "59af645ecb50fd0a3c118ae9",
    "type": "article",
    "title": "This is a test article",
    "content": {
      "entityMap": {},
      "blocks": [
        {
          "key": "erg1h",
          "text": "Hello, world...",
          "type": "header-four",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "dmpcr",
          "text": "",
          "type": "header-four",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "pivf",
          "text": "function test () {",
          "type": "code-block",
          "depth": 0,
          "inlineStyleRanges": [
            {
              "offset": 9,
              "length": 5,
              "style": "ITALIC"
            },
            {
              "offset": 9,
              "length": 5,
              "style": "BOLD"
            }
          ],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "6bn02",
          "text": "  console.log('This is a test article')",
          "type": "code-block",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "4ii6g",
          "text": "}",
          "type": "code-block",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }
      ]
    },
    "text": "Hello, world...\n\nfunction test () {\n  console.log('This is a test article')\n}",
    "author": mongdb.ObjectID("583ff3d6a193d70f6946948e"),
    "tags": [],
    "created_at": "2017-09-06T02:58:38.040Z",
    "show_comments": false,
    "likers": [],
    "comments": [],
    "images": [
      "/styles/images/sliders/great-frontend.png"
    ]
  }],
  user: [{
    "_id": mongdb.ObjectID("583ff3d6a193d70f6946948e"),
    "id_str": "583ff3d6a193d70f6946948e",
    "firstName": "Kuan",
    "lastName": "Lu",
    "username": "Kenny",
    "gender": "male",
    "email": "cnkuan@qq.com",
    "birthday": "1991/12/20",
    "phone": "13918544928",
    "profession": "Web Developer",
    "password": "d61e28884bdc7678e6d3474eaf7f7e46", // kuankuan
    "image_url": "/styles/images/kuan.jpg",
    "background_image_url": "/styles/images/users/user-center-bg.jpg",
    "lq_background_url": "/styles/images/lqip/users/user-center-bg.jpg",
    "signature": "This guy has no signature...",
    "role": "admin",
    'blogs': ['59af686ea22f3d43182fe3a8', '59af645ecb50fd0a3c118ae9'],
    "focuses": [],
    "focuses_list": {
      "no_groups": [],
      "friends": [],
      "special_focuses": []
    },
    "fans": [],
    "fans_list": {
      "no_groups": []
    },
    "recent_chat_connections": [{
      "this_user_id": "583ff3d6a193d70f6946948e",
      "connect_date": "2017-08-27T02:41:56.520Z",
      "new_messsges_number": 0,
      "messages": []
    }]
  }, {
    "_id": mongdb.ObjectID("583ff3d6a193d70f6946948f"),
    "id_str": "583ff3d6a193d70f6946948f",
    "firstName": "Yao",
    "lastName": "Ji",
    "username": "Jenny",
    "gender": "male",
    "email": "jenny@qq.com",
    "birthday": "1992/10/01",
    "phone": "",
    "profession": "Web Developer",
    "password": "fe116f6bdcc982e37172fff18a912079", // jiyao
    "image_url": "/styles/images/users/default-user.svg",
    "background_image_url": "/styles/images/users/user-center-bg.jpg",
    "lq_background_url": "/styles/images/lqip/users/user-center-bg.jpg",
    "signature": "This guy has no signature...",
    "role": "user",
    'blogs': [],
    "focuses": [],
    "focuses_list": {
      "no_groups": [],
      "friends": [],
      "special_focuses": []
    },
    "fans": [],
    "fans_list": {
      "no_groups": []
    },
    "recent_chat_connections": [{
      "this_user_id": "583ff3d6a193d70f6946948e",
      "connect_date": "2017-08-27T02:41:56.520Z",
      "new_messsges_number": 0,
      "messages": []
    }]
  }]
};

export default seed;