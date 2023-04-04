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
    let getUID = new Promise((resolve, reject) => {
        dbConnection.query(`SELECT UUID()`),
        (err, results) => {
            if (err) {
                console.log("Failed to generate UUID")
            }
            // Else use uuid
            results.json().then((uid) => {
                // Record id
                dbConnection.query(`INSERT INTO ${USER_IDS} (uid) VALUES (UUID())`);
                resolve(uid)
            });
        }
    })
    getUID.then((uid) => {
        // Record email
        dbConnection.query(`INSERT INTO ${USER_EMAILS} (id, email) VALUES
        ('${uid}', '${email}')`);
        // Record password
        dbConnection.query(`INSERT INTO ${USER_PWDS} (id, pwd) VALUES
        ('${uid}', '${encodePassword(password)}')`);
    })
}

/**
 * Verify that user exists in the database
 * @param {String} email 
 * @param {String} password 
 */
function verifyUser(email, password) {
    let id = getUserID(email);
    if (id != -1) {
        let recordedPwd = getPassword(id);
        if (recordedPwd != -1) {
            return (recordedPwd == password);
        }
    }
    return false;
}

/**
 * Find user id from email
 * @param {String} email 
 */
function getUserID(email) {
    dbConnection.query(`SELECT * from ${USER_EMAILS} WHERE email = ${email}`, (err, results) => {
        if (err) {
            console.log("Cannot find id for email: " + email);
            return(-1);
        }
        else {
            return(results);
        }
    });
}

/**
 * Use AES-256 to encrypt password
 * @param {String} pwd 
 */
function encodePassword(pwd) {
    let encryptedData = cipher.update(pwd, "utf-8", "hex");
    return encryptedData;
}

/**
 * Find password attached to ID
 * @param {String} id 
 */
function getPassword(id) {
    // Retrieve
    dbConnection.query(`SELECT * from ${USER_PWDS} WHERE id = ${id}`, (err, results) => {
        if (err) {
            console.log("Cannot find password for id: " + id);
            return(-1);
        }
        else {
            // Decipher
            console.log("PWD Results: " + results);
            let decryptedData = decipher.update(results, "hex", "utf-8");
            return(decryptedData);
        }
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

module.exports = { createUserTables, addUser, verifyUser, getUserID, getUserData }