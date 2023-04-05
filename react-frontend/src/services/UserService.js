// Connections to API
const backendURL = "http://localhost:3080";

/**
 * Send new user data to api
 * @param {String} email 
 * @param {String} password 
 */
function addUser(email, password) {
    // Send content to server
    fetch(`${backendURL}/addUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: `${email}`,
            pwd: `${password}`,
        }),
    }).then((response) => {
        console.log("addUser Response: " + response);
        // response.json().then((userData) => {
        //     return userData.uid;
        // });
    });
}

/**
 * Send new user data to api
 * @param {String} email 
 * @param {String} password 
 */
function verifyUser(email, password) {
    return new Promise((resolve, reject) => {
        console.log("Verifying user: " + email + ", " + password);
        fetch(`${backendURL}/checkUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: `${email}`,
                pwd: `${password}`,
            }),
        }).then((response) => {
            console.log("checkUser Response: " + response);
            // response.json().then((userVerified) => {
            //     return userVerified;
            // });
            resolve(true);
        });
    });
}

module.exports = { addUser, verifyUser }