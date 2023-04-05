const { createMessageTable, deleteMessageTable } = require('./dbMessages')

// Connection
let dbConnection;

// Table names
const CHANNEL_IDS = "channel_ids";

/**
 * Get mysql connection
 * @param {Object} connection 
 */
function setConnection(connection) {
    console.log("Setting connection for channels");
    dbConnection = connection
}

/**
 * Initialisation sequence for a channel table
 * @param {Object} dbConnection: connection for database 
 */
function createChannelTable(connection) {
    dbConnection = connection;
    dbConnection.query(`CREATE TABLE ${CHANNEL_IDS} ( 
        id int unsigned NOT NULL auto_increment,
        name varchar(254) NOT NULL,
        PRIMARY KEY (id))`, 
        (err, results) => {
            if (err) {
                console.log("Could not create table within db");
                return("Error: table not created")
            }
        }
    );
}

/**
 * Insert new channel into table
 * @param {String} channelName
 */
function addChannel(channelName) {
    // Check if channel name already exists, modifiy if needed

    // Insert
    dbConnection.query(`INSERT INTO ${CHANNEL_IDS} (name) VALUES
    ('${channelName}')`);
    let latestID = dbConnection.query(`SELECT LAST_INSERT_ID()`);
    // Create message table for new channel
    createMessageTable(dbConnection, latestID);
}

/**
 * Get all channel ids and names
 */
function getChannels() {
    dbConnection.query(`SELECT * from ${CHANNEL_IDS}`, (err, results) => {
        if (err) {
            console.log("Cannot get channels from table");
            return(-1);
        }
        else {
            return(results);
        }
    });
}

/**
 * Find id
 * @param {String} channelName 
 */
function getChannelID(channelName) {
    dbConnection.query(`SELECT * from ${CHANNEL_IDS} WHERE name = '${channelName}'`, (err, results) => {
        if (err) {
            console.log("Cannot find id for channel: " + channelName);
            return(-1);
        }
        else {
            return(results);
        }
    });
}

/**
 * Remove channel, and removes messages associated with channel
 * @param {String} channelID 
 */
function deleteChannelByID(channelID) {
    // Delete content
    deleteChannelMessages(channelID)
    // Delete channel
    `DELETE FROM ${CHANNEL_IDS} WHERE id='${channelID}';`
}

/**
 * Delete all messages belonging to channel by dropping message table
 * associated with channel
 * @param {String} channelID 
 */
function deleteChannelMessages(channelID) {
    deleteMessageTable(channelID);
}

module.exports = { setConnectionForChannels: setConnection, createChannelTable, getChannels, addChannel, getChannelID, deleteChannelByID }