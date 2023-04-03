/**
 * Initialisation sequence for a channel table
 * @param {Object} dbConnection: connection for database 
 */
function createChannelTable(dbConnection) {

}

/**
 * Insert new channel into table
 * @param {String} channelName
 */
function addChannel(channelName) {

}

/**
 * Find id
 * @param {String} channelName 
 */
function getChannelID(channelName) {

}

/**
 * Remove channel, and removes messages associated with channel
 * @param {String} channelID 
 */
function deleteChannelByID(channelID) {
    // Delete content
    deleteChannelMessages(channelID)
}

/**
 * Delete all messages belonging to channel by dropping message table
 * associated with channel
 * @param {String} channelID 
 */
function deleteChannelMessages(channelID) {

}

module.exports = { createChannelTable, addChannel, getChannelID, deleteChannelByID }