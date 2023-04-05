const mysql = require('mysql');

const { setConnectionForUsers, createUserTables } = require('./dbUsers')
const { setConnectionForChannels, createChannelTable } = require('./dbChannels')
const { setConnectionForMessages } = require('./dbMessages')

let dbConnection;
let dbName = "channelchatdb";

/**
 * Return connection if already made, else create it
 * @returns dbConnection: connection for mysql
 */
function getConnection() {
    if (!dbConnection) {
        // Create connection
        console.log("Making connection");
        // Establish connection
        dbConnection = mysql.createConnection({
            host: 'db',
            user: 'root',
            password: 'test'
        });
        console.log("Made connection: " + dbConnection);
        setConnectionForUsers(dbConnection);
        setConnectionForChannels(dbConnection);
        setConnectionForMessages(dbConnection);
        return getDB();
    }
    else {
        setConnectionForUsers(dbConnection);
        setConnectionForChannels(dbConnection);
        setConnectionForMessages(dbConnection);
        return dbConnection;
    }
}

/**
 * Get main db if it exists, else create it
 */
function getDB() {
    // Check if db exists
    dbConnection.query(`USE ${dbName}`,
    (err, results) => {
        // If db doesn't exist, create one
        if (err) {
            console.log("creating db");
            return createDB();
        }
        // DB already set up
        else {
            console.log("db exists");
            return dbConnection;
        }
    });
}

/**
 * Promise based function to create new db
 */
function createDB() {
    let newDB = new Promise((resolve, reject) => {
        dbConnection.query(`CREATE DATABASE ${dbName}`,
        (err, results) => {
            if (err) {
                console.log("Could not create database:");
                console.log(err);
                reject("Error");
            }
            else {
                dbConnection.query(`USE ${dbName}`,
                (err, results) => {
                    if (!err) {
                        resolve("Done");
                    }
                    else {
                        console.log("Could not select database.");
                        reject();
                    }
                });
            }
        });
    })
    newDB.then(() => {
        // Add tables
        return addTables();
    });
}

/**
 * Promise based function to add tables to new db
 */
function addTables() {
    let newTables = new Promise((resolve, reject) => {
        // Create table for users
        createUserTables(dbConnection);
        // Create table for channels
        createChannelTable(dbConnection);
        resolve("Done");
    })
    newTables.then(() => {
        return dbConnection;
    });  
}

module.exports = { getConnection }
