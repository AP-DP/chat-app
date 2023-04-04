// Connections to API
const backendURL = "http://localhost:3080";

// Initialise db or clear current posts
const getDB = () => fetch(`${backendURL}/init`, {
    method: 'POST'
}).then((response) => {
    console.log("init response: " + response);
//   response.text().then((data) => {
//     if (data === "Database and table created" || data === "Database exists") {
//       console.log("DB Connected")
//     }
//   });
});

module.exports = { getDB }