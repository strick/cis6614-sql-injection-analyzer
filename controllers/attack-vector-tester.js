var inputGenerator = require('../input-generator');
//const dbo = require('../db').DbConnector.open();
const DbConnector = require('../db').DbConnector;

function getPayload(request) {

    var payload = request.body.payload;
    try{
        payload = JSON.parse(payload);
    }
    catch(e){

    }

    return payload;
}

module.exports = {
    
    index: function (request, response, next) {

        response.render('attack-vector-tester/index', {
            sql: inputGenerator.inputGenerator(),
            query: '',
            pageTitle: 'Attack Vector Tester',
            success: true 
        });
    },

    // Assuming that the user is looking for a single row and parses the JSON request
    // You are able to inject "comparison operators" ref: https://www.bmc.com/blogs/mongodb-operators/, something such as { "$gt": "" } to recieve the first record
    // i.e. a login attack  Ref: https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb
    // Notes:  $gt "" works because a username string is greater than "", $lt in this case wouldn't work
    // becaues a username string isn't going to be less than and empty string "".
    // TODO: Make the tool run all of the verbs
    /*
    $gt | $gte: ""
    $lt | $lte: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"   // could use this bue gt is simple, other examples though
    used https://guidgenerator.com/ Add ref!!
    $nin: ["9374d534-0a72-4201-a9e1-94f6880591f6"]
    $ne: "9374d534-0a72-4201-a9e1-94f6880591f6"

    $eq and $in doesn't help as you need to know the values :)
    */
    // 
    // How to mitigate it: TBD
    verbAttack: async function(request, response,){

        DbConnector.open();
        var payload = getPayload(request);

        console.log("Running verb attacks:");
        console.log("Payload: " + JSON.stringify(payload));

        //var query = { $where: function() { return this.username = "brian" }};//'{ $where: function() { return username = ' + request.body.test + '}};'//0;var date=new Date(); do{curDate = new Date();}while(curDate-date<10000)'};
        //dbo.collection('users').find({"$where": "function(){ return this.username = '" + request.body.test + "';}" }).toArray(function(err, result) {
        await DbConnector.db.collection('users').findOne({"username": payload}, function(err, result) {

            if (err) throw err;
            console.log(`Query: dbo.collection('users').findOne({"username": ${JSON.stringify(payload)}"`);
            console.log(result);            

        });

        await DbConnector.db.collection('users').find({"username": payload}).toArray(function(err, result) {
            if (err) throw err;
    
            
            console.log(`Query: dbo.collection('users').find({"username": ${JSON.stringify(payload)}"`);
            console.log(result);
    
        });

        response.render('attack-vector-tester/index', {
            success: true,
            query: `findOne({"username": ${JSON.stringify(payload)}})`,
            pageTitle: 'Attack Vector Tester'
        });

    },

        /**
     * Why does this work:  
     * 
     * How to implement: ' || 'a'=='a
     *  ' || (function(){ var date=new Date(); do{curDate = new Date();}while(curDate-date<10000);})() || ' 
     */
    jsInjectionAttack: async function(request, response){

        DbConnector.open();
        var payload = request.body.payload;;//getPayload(request);

        var quoteType = request.body.quoteType;
        //console.log('Quote type')
        if(quoteType == 0){
            payload = "'" + payload + "'";
        }
        else {
            payload = '"' + payload + '"';
        }

        console.log("Paylolad is: " + payload);
        

        //var query = { $where: function() { return this.username = "brian" }};//'{ $where: function() { return username = ' + request.body.test + '}};'//0;var date=new Date(); do{curDate = new Date();}while(curDate-date<10000)'};
        //dbo.collection('users').find({"$where": "function(){ return this.username = '" + request.body.test + "';}" }).toArray(function(err, result) {
        await DbConnector.db.collection('users').find({$where: `this.username == ${payload}`}).toArray(function(err, result) {

            console.log("Familari SQLI attack with ||") 
            console.log(`dbo.collection('users').find({$where: \`this.username == ${payload}\`})`);

            if (err) {
                //throw err;
                console.log(err);
                response.render('index', {
                    success: false,
                    //query: ".find({$where: `this.username == ' ${JSON.stringify(payload)}'})`"
                    query: '.find({$where: `this.username == "${JSON.stringify(payload)}"})`',
                    pageTitle: 'Attack Vector Tester'
                });
                return;
            }
        
            console.log(result);

            response.render('attack-vector-tester/index', {
                success: true,
                query: ".find({$where: `this.username == ' ${JSON.stringify(payload)}})`",
                pageTitle: 'Attack Vector Tester'
            });
        });
        
    }
}