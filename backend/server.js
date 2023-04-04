'use strict';

// Load packages
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const jsonParser = bodyParser.json()

// Server
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    maxAge: 600
}));

// Connection variables
const PORT = 3080;
const HOST = '0.0.0.0';

// Database variables
const { getConnection } = require('./dbInit')
const { addUser, verifyUser, getUserID, getUserData } = require('./dbUsers')

// Set up connection
let dbConnection = getConnection();

// Routes

/**
 * Check that db has been created
 */
app.route('/init')
    .post((req, res, next) => {
        console.log("db check");
        console.log(dbConnection);
    })

/**
 * post: insert new data into initial table
 */
app.route('/addPost')
    .post(jsonParser, (req, res, next) => {
        // Extract post components
        let topic = req.body.topic;
        let data = req.body.data;
        // Insert into table
        dbConnection.query(`INSERT INTO posts (topic, data) VALUES
        ('${topic}', '${data}')`);

        res.send("Posted");
    })
    .patch((req, res, next) => {
        // Space to update existing posts
    })

/**
 * get: retrieve all posts from table
 * patch: retrieve newest posts
 */
app.route('/getPosts')
    .get((req, res, next) => {
        dbConnection.query(`SELECT * from posts`, (err, results) => {
            if (err) {
                console.log("Cannot retrieve posts");
                console.log(err);
                res.send(err);
            }
            else {
                res.send(results);
            }
        });
    })
    .patch(jsonParser, (req, res, next) => {
        // Extract search parameters
        let latestPostID = req.body.latest;
        // Get new posts
        dbConnection.query(`SELECT * from posts WHERE id > ${latestPostID}`, (err, results) => {
            if (err) {
                console.log("Cannot retrieve posts");
                console.log(err);
                res.send(err);
            }
            else {
                res.send(results);
            }
        });
    })

app.listen(PORT, HOST);
console.log('Server up and running');