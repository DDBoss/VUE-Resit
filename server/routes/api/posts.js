const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

//Get Course
router.get('/Course', async (req, res) => {
    const posts = await loadCourseCollection();
    res.send(await posts.find({}).toArray());
})

//Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        email: req.body.email, // Email -> text
        pass: req.body.pass,
        createdAt: new Date()
    });
    res.status(201).send();
})

//Add Course
router.post('/Course', async (req, res) => {
    const posts = await loadCourseCollection();
    await posts.insertOne({
        topic: req.body.topic, 
        price: req.body.price,
        location: req.body.location,
        createdAt: new Date()
    });
    res.status(201).send();
})

//Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

async function loadPostsCollection() { //Change to User collection
    const client = await mongodb.MongoClient.connect('mongodb+srv://testboy:A123456@cluster0.pkzla.mongodb.net/vue_express?retryWrites=true&w=majority', {
        useNewUrlParser:true
    });

    return client.db('school_DB').collection('User');
}

async function loadCourseCollection() { 
    const client = await mongodb.MongoClient.connect('mongodb+srv://testboy:A123456@cluster0.pkzla.mongodb.net/vue_express?retryWrites=true&w=majority', {
        useNewUrlParser:true
    });

    return client.db('school_DB').collection('Course');
}

module.exports = router;