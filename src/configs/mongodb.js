import MongoClient from 'mongodb';
import assert from 'assert';
import config from './server';
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
  console.log(`${'==>'.green} Start to check database......`);

  MongoClient.connect(url, (connectErr, db) => {
    if (connectErr) {
      // console.log(`==> Database unavaliable: ${url}`.gray);
      return reject('Database connectErr :', connectErr);
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
  Promise.all(mongodbPromises)
    .then(() => {
      global.dbIsAvaliable = true;
      console.log('Connect mongodb succssfully');
    })
    .catch((error) => {
      console.log('Connect mongodb catch error:', error);
    });
};

