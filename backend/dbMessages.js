// Table names
const MESSAGE_IDS = "message_ids";

/**
 * Initialisation a message table for new channel
 * @param {Object} dbConnection: connection for database 
 * @param {String} channelID: channel the messages belongs to
 */
function createMessageTable(dbConnection, channelID) {
    dbConnection.query(`CREATE TABLE ${MESSAGE_IDS}_${channelID} ( 
        id int unsigned NOT NULL auto_increment,
        root int unsigned NOT NULL,
        parent int unsigned NOT NULL,
        author varchar(254) NOT NULL,
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
 * @param {String} channel: channel the message belongs to
 * @param {String} root: topmost message to which this may be a reply, "" if this is a root
 * @param {String} parent: none if root, otherwise root or a message in the replies to the root ("messageID")
 * @param {String} author: user who create message
 * @param {String} timestamp: time the message was submitted by the user
 */
function addMessage(channel, root, parent, author, timestamp) {

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
 * Find all messages replying to a 0th level message
 * @param {String} root 
 */
function findAllReplies(root) {

}

/**
 * Remove message
 * @param {String} messageID 
 */
function deleteMessage(messageID) {

}

module.exports = { createMessageTable, addMessage, findInMessages, findByAuthor, findAllReplies, deleteMessage }