// Load packages
const crypto = require("crypto");

// Connection
let dbConnection;

// Table names
const USER_IDS = "user_ids";
const USER_EMAILS = "user_emails";
const USER_PWDS = "user_pwds";
const USER_DATA = "user_data";

// Pwd variables
const initVector = crypto.randomBytes(16);
const securitykey = crypto.randomBytes(32);
const algorithm = 'aes-256-cbc';
const cipher = crypto.createCipheriv(algorithm, securitykey, initVector);
const decipher = crypto.createDecipheriv(algorithm, securitykey, initVector);

/**
 * Get mysql connection
 * @param {Object} connection 
 */
function setConnection(connection) {
    console.log("Setting connection for users");
    dbConnection = connection
}

/**
 * Initialisation sequence for a user tables
 * @param {Object} connection: connection for database 
 */
function createUserTables(connection) {
    dbConnection = connection;
    // UID Table
    dbConnection.query(`CREATE TABLE ${USER_IDS} ( 
        id int unsigned NOT NULL auto_increment,
        uid varchar(36) NOT NULL,
        PRIMARY KEY (id))`, 
        (err, results) => {
            if (err) {
                console.log("Could not create table within db: " + USER_IDS);
                return("Error: table not created")
            }
            else {
                // Email Table
                dbConnection.query(`CREATE TABLE ${USER_EMAILS} ( 
                    id varchar(36) NOT NULL,
                    email varchar(254) NOT NULL,
                    PRIMARY KEY (id))`, 
                    (err, results) => {
                        if (err) {
                            console.log("Could not create table within db: " + USER_EMAILS);
                            return("Error: table not created")
                        }
                        else {
                            // Password Table
                            dbConnection.query(`CREATE TABLE ${USER_PWDS} ( 
                                id varchar(36) NOT NULL,
                                pwd varchar(64) NOT NULL,
                                PRIMARY KEY (id))`, 
                                (err, results) => {
                                    if (err) {
                                        console.log("Could not create table within db: " + USER_PWDS);
                                        return("Error: table not created")
                                    }
                                    else {
                                        // User Data Table
                                        dbConnection.query(`CREATE TABLE ${USER_DATA} ( 
                                            id varchar(36) NOT NULL,
                                            name varchar(254) NOT NULL,
                                            ranking int signed NOT NULL,
                                            PRIMARY KEY (id))`, 
                                            (err, results) => {
                                                if (err) {
                                                    console.log("Could not create table within db: " + USER_DATA);
                                                    return("Error: table not created")
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
}

/**
 * Add user data to user and password tables
 * @param {String} email 
 * @param {String} password 
 */
function addUser(email, password) {
    // Generate UUID
    let uid = crypto.randomUUID();
    // Insert new user data
    dbConnection.query(`INSERT INTO ${USER_IDS} (uid) VALUES ('${uid}')`);
    // Record email
    dbConnection.query(`INSERT INTO ${USER_EMAILS} (id, email) VALUES
    ('${uid}', '${email}')`);
    // Record password
    encodePassword(password).then((encryptedData) => {
        console.log(encryptedData);
        dbConnection.query(`INSERT INTO ${USER_PWDS} (id, pwd) VALUES
        ('${uid}', '${encryptedData}')`)
    });
    // Send uid
    return JSON.stringify({
        userID: uid
    })
}

/**
 * Verify that user exists in the database
 * @param {String} email 
 * @param {String} password 
 */
function verifyUser(email, password) {
    getUserID(email).then((id) => {
        // Check for empty result
        if (id.length > 0) {
            getPassword(id).then((recordedPwd) => {
                // Check for empty result
                if (recordedPwd != null) {
                    return(recordedPwd == password);
                }
            })
        }
        return false;
    });
}

/**
 * Find user id from email
 * @param {String} email 
 */
function getUserID(email) {
    return new Promise((resolve, reject) => {
        dbConnection.query(`SELECT * from ${USER_EMAILS} WHERE email = "${email}"`, (err, results) => {
            if (err) {
                console.log("Error: unable to look for email in user_emails");
                reject(err);
            }
            else {
                // Results may be empty, or will contain 1 value
                resolve(results);
            }
        });
    });
}

/**
 * Use AES-256 to encrypt password
 * @param {String} pwd 
 */
function encodePassword(pwd) {
    return new Promise((resolve, reject) => {
        let encrypted = cipher.update(pwd, "utf-8", "hex");
        encrypted += cipher.final('hex');
        resolve(encrypted);
    })
}

/**
 * Find password attached to ID
 * @param {String} id 
 */
function getPassword(id) {
    // Retrieve
    return new Promise((resolve, reject) => {
        dbConnection.query(`SELECT * from ${USER_PWDS} WHERE id = "${id}"`, (err, results) => {
            if (err) {
                console.log("Error: unable to look for id in user_pwds");
                reject(err);
            }
            else {
                if (results.length > 0) {
                    // Decipher
                    let decryptedData = decipher.update(results, "hex", "utf-8");
                    resolve(decryptedData);
                }
                else {
                    resolve(null)
                }
            }
        });
    });
}

/**
 * Find username and user ranking
 * @param {String} id 
 */
function getUserData(id) {
    // Get username

    // Get ranking
}

module.exports = { setConnectionForUsers: setConnection, createUserTables, addUser, verifyUser, getUserID, getUserData }