// Connection
let dbConnection;

// Table names
const MESSAGE_IDS = "message_ids";

/**
 * Get mysql connection
 * @param {Object} connection 
 */
function setConnection(connection) {
    console.log("Setting connection for messages");
    dbConnection = connection
}

/**
 * Initialisation a message table for new channel
 * @param {Object} dbConnection: connection for database 
 * @param {String} channelID: channel the messages belongs to
 */
function createMessageTable(connection, channelID) {
    dbConnection = connection;
    dbConnection.query(`CREATE TABLE ${MESSAGE_IDS}_${channelID} ( 
        id int unsigned NOT NULL auto_increment,
        root int unsigned NOT NULL,
        parent int unsigned NOT NULL,
        author varchar(254) NOT NULL,
        content varchar(1000) NOT NULL,
        timestamp varchar(254) NOT NULL,
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
 * 
 * @param {String} channelID: channel the message belongs to
 * @param {String} root: is this a root, 0 for false, 1 for true
 * @param {String} parent: 0 if root, otherwise id of parent
 * @param {String} author: user who create message
 * @param {String} content: body of the message
 * @param {String} timestamp: time the message was submitted by the user
 */
function addMessage(channelID, root, parent, author, content, timestamp) {
    // Reformat string input
    let isRoot = parseInt(root);
    let parentID = parseInt(parent);
    // Double up any single quotes
    let robustMessage = content.replaceAll("'", "''");
    dbConnection.query(`INSERT INTO ${MESSAGE_IDS}_${channelID} (root, parent, author, content, timestamp) VALUES
    (${isRoot}, ${parentID}, '${author}', '${robustMessage}', '${timestamp}')`, (err, results) => {
        if (err) {
            console.log("Could not insert messsage into channel: " + channelID)
            console.log(err);
        }
    });
}

/**
 * Get all messages for a channel
 * @param {String} channelID: channel that messages belongs to
 */
function getMessages(channelID) {
    dbConnection.query(`SELECT * from ${MESSAGE_IDS}_${channelID}`, (err, results) => {
        if (err) {
            console.log("Cannot get messages for channel " + channelID);
            return(err);
        }
        else {
            return(results);
        }
    });
}

/**
 * Find any messages containing keyword or phrase
 * @param {String} substring 
 */
function findInMessages(substring) {

}

/**
 * Find any messages by a specific user
 * @param {String} author 
 */
function findByAuthor(author) {

}

/**
 * Find all root messages
 * @param {String} channelID 
 */
function findAllRoots(channelID) {
    dbConnection.query(`SELECT * from ${MESSAGE_IDS}_${channelID} WHERE id = 0`, (err, results) => {
        if (err) {
            console.log("Cannot get root messages for channel " + channelID);
            return(err);
        }
        else {
            return(results);
        }
    });
}

/**
 * Remove message
 * @param {String} messageID 
 */
function deleteMessage(messageID) {

}

/**
 * Remove message table
 * @param {String} channelID 
 */
function deleteMessageTable(channelID) {
    // DROP TABLE table_name;
    dbConnection.query(`DROP TABLE ${MESSAGE_IDS}_${channelID}`);
}

module.exports = { setConnectionForMessages: setConnection, createMessageTable, addMessage, getMessages, findInMessages, findByAuthor, findAllRoots, deleteMessage, deleteMessageTable }