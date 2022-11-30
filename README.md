# MEN Injection Guard
Project for CIS 6614
## Installation Instuctions
Please follow the following steps to install MEN Injection Guard onto your system along with its vunreable test application

### Prereqs

To successfully run MEN Injection Guard on your system, you will need to have MongoDb install and running as well as Node.js and NPM.

#### MongoDb Atlas

MongoDb Atlas provides a free teir verison for a MongoDb database.  To setup, you'll need to do the following:

1) Create an account here:  https://www.mongodb.com/cloud.  Once you've setup an account you shoudl be able to create a new project and from there build a new database:

![image](https://user-images.githubusercontent.com/1486739/204689441-bf2c572c-2a10-4e7b-b66e-618c2d7cceac.png)

2) Make sure you select the Free teir options so that you aren't charged.

3) Create a username and password

4) Add your IP address to the IP Access list

5) Create a new database called "sqli" and a collection called "users1"

6) Insert some username and password documents

![image](https://user-images.githubusercontent.com/1486739/204690671-499c20a1-3092-438e-b447-2716cc76ea4f.png)

#### Node.js and NPM

To install Node.js, following the instructions for your system here:  https://nodejs.org/en/

NPM should be included, but if it's not, you are able to download it here:  https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Installing MEN Injection Guard

Now that you have all the prereqs install, you can now clone MEN Injection Guard to your local machine from here:  https://github.com/strick/cis6614-sql-injection-analyzer

Once you've downloaded a copy, you'll need to go into the root directory and run "npm update" or "npm install" to get all of the required dependencies.

Next you'll want to create .env file in the root directory with the following values:

ENV="dev"
DBHOST="your db host"  # looks like yourmongodbclustername.jwjidxx.mongodb.net/?retryWrites=true&w=majorit
DBNAME="your db name"
DBUSER="your db user"
DBTYPE="mongodb+srv"
DBPASS="your db passord"
