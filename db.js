var MongoClient = require('mongodb').MongoClient;
var dotenv = require('dotenv');
dotenv.config();

URL = `${process.env.DBTYPE}://${process.env.DBHOST}/${process.env.DBNAME}`;

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
            return db.db(process.env.DBNAME);
     
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