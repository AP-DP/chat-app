// Load packages
const crypto = require("crypto");

// Table names
const USER_IDS = "user_ids";
const USER_EMAILS = "user_emails";
const USER_PWDS = "user_pwds";
const USER_DATA = "user_data";

/**
 * Initialisation sequence for a user tables
 * @param {Object} dbConnection: connection for database 
 */
function createUserTables(dbConnection) {
    // UID Table
    dbConnection.query(`CREATE TABLE ${USER_IDS} ( 
        id int unsigned NOT NULL auto_increment,
        uid varchar(36) NOT NULL,
        PRIMARY KEY (id))`, 
        (err, results) => {
            if (err) {
                console.log("Could not create table within db:");
                return("Error: table not created")
            }
            // Table created
            else {
                
            }
        }
    );
    // Email Table
    dbConnection.query(`CREATE TABLE ${USER_EMAILS} ( 
        id varchar(36) NOT NULL,
        email varchar(254) NOT NULL,
        PRIMARY KEY (id))`, 
        (err, results) => {
            if (err) {
                console.log("Could not create table within db:");
                return("Error: table not created")
            }
            // Table created
            else {
                
            }
        }
    );
    // Password Table
    dbConnection.query(`CREATE TABLE ${USER_PWDS} ( 
        id varchar(36) NOT NULL,
        pwd varchar(254) NOT NULL,
        PRIMARY KEY (id))`, 
        (err, results) => {
            if (err) {
                console.log("Could not create table within db:");
                return("Error: table not created")
            }
            // Table created
            else {
                
            }
        }
    );
    // User Data Table
    dbConnection.query(`CREATE TABLE ${USER_DATA} ( 
        id varchar(36) NOT NULL,
        name varchar(254) NOT NULL,
        ranking int signed NOT NULL,
        PRIMARY KEY (id))`, 
        (err, results) => {
            if (err) {
                console.log("Could not create table within db:");
                return("Error: table not created")
            }
            // Table created
            else {
                
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

}

/**
 * Verify that user exists in the database
 * @param {String} email 
 * @param {String} password 
 */
function verifyUser(email, password) {

}

/**
 * Find user id from email
 * @param {String} email 
 */
function getUserID(email) {
    
}

/**
 * Use SHA-256 to encrypt password
 * @param {String} pwd 
 */
function encodePassword(pwd) {

}

/**
 * Find password attached to ID
 * @param {String} id 
 */
function getPassword(id) {
    // Retrieve

    // Decipher

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