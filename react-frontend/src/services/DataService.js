// Connections to API
const backendURL = "http://localhost:3080";

// Initialise db or clear current posts
function getDB() {
    fetch(`${backendURL}/init`, {
        method: 'POST'
    }).then((response) => {
        console.log("init response: " + response);
    //   response.text().then((data) => {
    //     if (data === "Database and table created" || data === "Database exists") {
    //       console.log("DB Connected")
    //     }
    //   });
    });
}

/**
 * Find all channels
 * @returns All channel IDs
 */
function getChannels() {
    fetch(`${backendURL}/init`, {
        method: 'GET'
    }).then((response) => {
        console.log("channels: " + response);
    });
}

/**
 * Add new channel
 * @returns new channel data
 */
function addChannel(channelName) {
    fetch(`${backendURL}/addChannel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            channel: `${channelName}`,
        }),
    }).then((response) => {
        console.log("channels: " + response);
    });
}

/**
 * Get all messages for a channel
 * @param {String} channelName 
 */
function getMessages(channelName) {
    fetch(`${backendURL}/getMessages/${channelName}`, {
        method: 'GET'
    }).then((response) => {
        console.log("channel messages: " + response);
    });
}

/**
 * Add new message to a channel
 * @returns new message data
 */
function addMessage(channelName, root, parent, author, content, timestamp) {
    fetch(`${backendURL}/addMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            channel: `${channelName}`,
            root: `${root}`, 
            parent: `${parent}`, 
            author: `${author}`, 
            content: `${content}`,
            timestamp: `${timestamp}`
        }),
    }).then((response) => {
        console.log("message: " + response);
    });
}

module.exports = { getDB, getChannels, addChannel, getMessages, addMessage }