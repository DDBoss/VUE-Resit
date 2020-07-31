/*
Logout -
Search
Filter
Sorting
*/

const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://testboy:A123456@cluster0.pkzla.mongodb.net/vue_express?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const mongodb = require('mongodb');

const router = express.Router();

//----------------------------------------------------------------------------------------------------------------------------
//Get -->
router.get('/', async (req, res) => {
    client.connect(err => {
        const collection = client.db('school_DB').collection('User');
        // perform actions on the collection object
        collection.find().toArray((error, documents) => {
            if(error){
                throw error;
            }
            res.send(documents);
        });
        client.close;
    });
})
//----------------------------------------------------------------------------------------------------------------------------
//Create new user
router.post('/newUser', async (req, res) => {
    client.connect(err => {
        const collection = client.db('school_DB').collection('User');
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          
            if (!emailRegex.test(req.body["email"])) {
                return res.sendStatus(403);
            } else if (!req.body["pass"]) {
                return res.sendStatus(311);
            } else {
            collection.findOne( {"email": req.body["email"]}, function(err, result) {
                if(err || !result) { // If email does not match insert
                    collection.insertOne(req.body, (error, result) => {
                        if(error){
                            throw error;
                    }
                    res.send(result.email, result.pass, res.createdAt);
                    });
                  return res.sendStatus(200);
                } else { // If email matchs error
                  return res.sendStatus(403);
                }
              });
        }
        res.status(201).send();
        client.close;
    });
})
//----------------------------------------------------------------------------------------------------------------------------
//Add Post
router.post('/', async (req, res) => {
    client.connect(err => {
        const collection = client.db('school_DB').collection('User');
        // perform actions on the collection object
        collection.insertOne(req.body, (error, result) => {
            if(error){
                throw error;
            }
            res.send(result.email, result.pass, res.createdAt);
        });
        res.status(201).send();
        client.close;
    });
})
//----------------------------------------------------------------------------------------------------------------------------
//Get Course
router.get('/Course', async (req, res) => {
    client.connect(err => {
        const collection = client.db('school_DB').collection('Course');
        // perform actions on the collection object
        collection.find().toArray((error, documents) => {
            if(error){
                throw error;
            }
            res.send(documents);
        });
        client.close;
    });
})
//----------------------------------------------------------------------------------------------------------------------------
//Add Course
router.post('/Course', async (req, res) => {
    client.connect(err => {
        const collection = client.db('school_DB').collection('Course');
        // perform actions on the collection object
        collection.insertOne(req.body, (error, result) => {
            if(error){
                throw error;
            }
            res.send(result.topic, result.price, result.location, res.createdAt);
        });
        res.status(201).send();
        client.close;
    });
})
//----------------------------------------------------------------------------------------------------------------------------
//Log-in
router.post('/testing', async (req, res) => {
    client.connect(err => {
        const collection = client.db('school_DB').collection('User');
            collection.findOne( {"email": req.body["email"], "pass": req.body["pass"]}, function(err, result) {
                if(err || result) { // If email match 
                    res.send(result.email, result.pass, res.createdAt);
                } else {
                  return res.sendStatus(433);
                }
              });
        client.close;
    });
})
//----------------------------------------------------------------------------------------------------------------------------
// Search
router.get('/Search', async (req, res) => {
    client.connect(err => {
        const collection = client.db('school_DB').collection('Course');
        // perform actions on the collection object
        collection.find({ "topic": "Physics" }).toArray((error, documents) => {
            if(error){
                throw error;
            }
                res.send(documents);
        });
        client.close;
    });
})
//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------

module.exports = router;