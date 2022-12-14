# MEN Injection Guard
Project for CIS 6614

## Using MEN Injection Guard
### Scanning
- Go to https://men-injection-guard.azurewebsites.net/scanner and fill out the target configuration options:
- URL:  The URL that you want to attack
- Target Inuputs:  A comma delimeted list of input values to send NoSQL Injection attacks to.  For example If you want to populate <input name="username"> and <input name="password"> then you would type password,username
- Success Content:  This is the content you would expect to see on a successful attack

### Test Generator
- https://men-injection-guard.azurewebsites.net/test-generator adn fill out the target configuration options as above.

## Installation
### No Setup Required (Recommended)
1) MEN Injection Guard is hosted using Azure here:  https://men-injection-guard.azurewebsites.net/

### Local Machine Quick Setup (Use Existing MongoDb Atlas Server)
1) Install Node.js and NPM
2) Clone this repo to your machine
3) Create .env files in the root directory and in the /unsecure-app directory
4) Update the .env files with the supplied connection details (i.e. DBHOST=)
5) Navigate to the root directory (/) and start the application with "node app.js"
6) Navigate to /unsecure-app and run "node app.js"
4) Go to http://localhost:3000

### Full Installation Instuctions
Please follow the following steps to install MEN Injection Guard onto your system along with its vunreable test application

#### Prereqs

To successfully run MEN Injection Guard on your system, you will need to have MongoDb install and running as well as Node.js and NPM.

##### MongoDb Atlas

MongoDb Atlas provides a free teir verison for a MongoDb database.  To setup, you'll need to do the following:

1) Create an account here:  https://www.mongodb.com/cloud.  Once you've setup an account you shoudl be able to create a new project and from there build a new database:

![image](https://user-images.githubusercontent.com/1486739/204689441-bf2c572c-2a10-4e7b-b66e-618c2d7cceac.png)

2) Make sure you select the Free teir options so that you aren't charged.

3) Create a username and password

4) Add your IP address to the IP Access list

5) Create a new database called "sqli" and a collection called "users"

6) Insert some username and password documents

![image](https://user-images.githubusercontent.com/1486739/204690671-499c20a1-3092-438e-b447-2716cc76ea4f.png)

7) Grab the connection string to use in the .env files by going to "Databases" -> Connect -> Connect using VS Code.   Save this string to later put into your .env files as DBHOST=yourConnectionDetails

![image](https://user-images.githubusercontent.com/1486739/204696465-5fda3cad-bece-4bd4-a5b6-32059efa8254.png)

##### Node.js and NPM

To install Node.js, following the instructions for your system here:  https://nodejs.org/en/

NPM should be included, but if it's not, you are able to download it here:  https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

#### Installing MEN Injection Guard

Now that you have all the prereqs install, you can now clone MEN Injection Guard to your local machine from here:  https://github.com/strick/cis6614-sql-injection-analyzer

Once you've downloaded a copy, you'll need to go into the root directory and run "npm update" or "npm install" to get all of the required dependencies.

#### .env Setup

Next you'll want to create .env file in the root directory with the following values:

DBHOST="your db host"  # looks mongodb+srv://<user>:<password>@cluster0.jwjidxx.mongodb.net/test

Next, copy this .env into /unsecure-app (it will need it too) (i.e. you'll have /.env and a /unsecure-app/.env)

#### Lanuch app

Finally, navigate to the root directory and type "node app.js" to start the application.
Then go to /unsecure-app and start the test app with "node app.js"

The app should then be able to be accessed by going to http://localhost:3000.
