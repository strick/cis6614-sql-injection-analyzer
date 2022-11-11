var MongoClient = require('mongodb').MongoClient;

ENV="dev"
PORT="3001"
DBHOST="localhost:3001"
DBNAME="sqli"
DBUSER="sqli"
DBTYPE="mongodb"
DBPASS="temp1234"

URL = `${DBTYPE}://${DBHOST}/${DBNAME}`;

const DB_URL = URL;

class DbConnector {

    constructor(){      
    }

    connect(app) {
        
        //return MongoClient.connect(DB_URL, {
        return MongoClient.connect(DB_URL, {
           // serverSelectionTimeoutMS: 300000,
            useNewUrlParser: true, useUnifiedTopology: true
        })
        .then(db => {

            this.client = db;
            app.emit('db-ready'); 
            return db.db(DBNAME);
     
        })
        .catch(err => {
            console.error("Error to db", err);
            process.exit(1);
        });
    }

    close() {
        this.client.close();
    }
}

module.exports = {
    DbConnector: DbConnector
}