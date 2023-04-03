const { createUserTables } = require('./dbUsers')
const { createChannelTable, addChannel, getChannelID } = require('./dbChannels')
const { addMessage } = require('./dbMessages')

module.exports = () => {
    // Establish connection
    let dbConnection = mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'test'
    });
    // Check if db exists
    dbConnection.query(`USE channelchatdb`,
    (err, results) => {
        // If db doesn't exist, create one
        if (err) {
            console.log("creating db");
            dbConnection.query(`CREATE DATABASE channelchatdb`,
            (err, results) => {
                if (err) {
                    console.log("Could not create database:");
                    console.log(err);
                    res.status(404);
                    res.send('Retry');
                }
                // Create table for users
                createUserTables(dbConnection);
                // Create first channel
                createChannelTable(dbConnection);
                addChannel("Welcome");
                // Create first message
                addMessage(getChannelID("Welcome"), "", "", "admin", Date.now());
            });
        }
        // DB already set up
        else {
            console.log("db exists");
            return dbConnection;
        }
    });
}