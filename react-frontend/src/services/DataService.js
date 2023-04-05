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

module.exports = { getDB, getChannels }