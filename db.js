mongoose = require('mongoose');

ENV="dev"
PORT="3001"
DBHOST="localhost:3001"
DBNAME="sqli"
DBUSER="sqli"
DBTYPE="mongodb"
DBPASS="temp1234"

URL = `${DBTYPE}://${DBHOST}/${DBNAME}`;

const DB_URL = URL;
module.exports = {

    connect: (app) => {

        return mongoose.connect(DB_URL, {
           // serverSelectionTimeoutMS: 300000,
            useNewUrlParser: true, useUnifiedTopology: true
        })
        .then(x => {
            console.log( `Connected to dB: "${x.connections[0].host}"`);
            app.emit('db-ready');            
        })
        .catch(err => {
            console.error("Error to db", err);
            process.exit(1);
        });
    },

    //close the connection
    close: () => {
        mongoose.connection.close();
    }
};