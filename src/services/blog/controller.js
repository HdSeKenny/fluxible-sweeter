import MongoClient from 'mongodb';

const ObjectID = MongoClient.ObjectID;

export default {
  setDefaultBlog(body) {
    body.author = ObjectID(body.author);
    body.show_comments = false;
    body.likers = [];
    body.comments = [];
    body.images = ['/images/sliders/great-frontend.png'];
    body.tag = body.tag || body.type;

    return body;
  }
};
