var MongoDb = require('mongodb');
var MongoClient = MongoDb.MongoClient;
var ObjectID = MongoDb.ObjectID;
var config = require('./config.js');

class Db {
    static getInstance() {
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }
    constructor() {
        this.dbClient = '';
        this.connect();
    }
    connect() {
        let _that = this;
        return new Promise((resolve, reject) => {
            if (!_that.dbClient) {
                MongoClient.connect(config.dbUrl, { useNewUrlParser: true }, (err, client) => {
                    if (err) {
                        reject(err);
                    } else {
                        _that.dbClient = client.db(config.dbName);
                        resolve(_that.dbClient);
                    }
                })
            } else {
                resolve(_that.dbClient);
            }

        });
    }

    insert(collection, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(function (db) {
                db.collection(collection).insertOne(json, function (err, res) {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        resolve(res);
                    }
                });

            });
        });
    }
    find(collection, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(function (db) {
                var result = db.collection(collection).find(json);
                result.toArray(function (err, docs) {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        resolve(docs);
                    }
                });
            });
        });
    }
    update(collection, json1, json2) {
        return new Promise((resolve, reject) => {
            this.connect().then(function (db) {
                db.collection(collection).updateMany(json1, {
                    $set: json2
                }, function (err, docs) {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        resolve(docs);
                    }
                })
            });
        });
    }
    delete(collection, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(function (db) {
                db.collection(collection).deleteMany(json, function (err, docs) {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        resolve(docs);
                    }
                });

            });
        });
    }

    getObjectID(id) {
        return new ObjectID(id);
    }
}

module.exports = Db.getInstance();

