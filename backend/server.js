'use strict';

// Load packages and set up server
const express = require('express')
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
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
const { addChannel, getChannels, getChannelID } = require('./dbChannels')
const { addMessage, getMessages } = require('./dbMessages')

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
 * post: insert new user or modify
 */
app.route('/addUser')
    .post((req, res, next) => {
        // Extract post components
        let email = req.body.email;
        let pwd = req.body.pwd;
        // Insert into table
        let userID = addUser(email, pwd);
        res.send(userID);
    })
    .patch((req, res, next) => {
        // Space to update existing users
    })
    .delete((req, res, next) => {
        // Space to delete existing users
    })

/**
 * post: check if user exists in database
 * Note: Could integrate this into addUser above by passing verification = true/false in req
 */
app.route('/checkUser')
    .post((req, res, next) => {
        // Extract post components
        let email = req.body.email;
        let pwd = req.body.pwd;
        res.send(verifyUser(email, pwd));
    })

/**
 * get: retrieve all channels
 */
app.route('/getChannels')
    .get((req, res, next) => {
        res.send(getChannels());
    })

/**
 * post: create new channel
 */
app.route('/addChannel')
    .post((req, res, next) => {
        let channelName = req.body.channel;
        res.send(addChannel(channelName))
    })

/**
 * get: retrieve all messages for a particular channel
 */
app.route('/getMessages/:channelName')
    .get((req, res, next) => {
        let channelName = req.params.channelName;
        getChannelID(channelName).then((channelID) => {
            console.log("Checking id: " + channelID);
            res.send(getMessages(channelID))
        });
    })

/**
 * post: create new message for specific channel
 */
app.route('/addMessage')
    .post((req, res, next) => {
        let channelName = req.body.channel;
        let root = req.body.root;
        let parent = req.body.parent;
        let author = req.body.author;
        let content = req.body.content;
        let timestamp = req.body.timestamp;
        getChannelID(channelName).then((channelID) => {
            res.send(addMessage(channelID, root, parent, author, content, timestamp));
        })
    })

app.listen(PORT, HOST);
console.log('Server up and running');