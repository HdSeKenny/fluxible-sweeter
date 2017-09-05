import MongoClient from 'mongodb';
import assert from 'assert';
import 'colors';
import config from '../configs';
import seed from './seed';

const { mongo } = config;

const insertDefaultData = (url, db) => {
  if (url === mongo.sweeter.url) {
    db.collection('users').insert(seed.user, (err) => {
      assert.equal(null, err);
      db.close();
    });

    db.collection('blogs').insert(seed.blogs, (err) => {
      assert.equal(null, err);
      db.close();
    });
  }
  else {
    db.collection('test').insert({ 'test': 'test' }, (err) => {
      assert.equal(null, err);
      db.close();
    });
  }

  console.log(`${'==>'.green} Finish insert default data... `);
};


const connectMongodbPromise = (url) => new Promise((resolve, reject) => {
  MongoClient.connect(url, (connectErr, db) => {
    if (connectErr) {
      return reject('Database connectErr, please check your database');
    }

    db.listCollections().toArray((err, items) => {
      if (items.length == 0) {
        console.log(`${'==>'.gray} Database unavaliable: ${url}`);
        insertDefaultData(url, db);
      }
      else {
        console.log(`${'==>'.green} Database avaliable: ${url.cyan}`);
      }

      db.close();
      resolve();
    });
  });
});


export default () => {
  const mongodbPromises = [];
  mongodbPromises.push(
    connectMongodbPromise(mongo.sweeter.url),
    connectMongodbPromise(mongo.session.url)
  );

  console.log(`${'==>'.green} Start to check database......`);

  return mongodbPromises;
};
