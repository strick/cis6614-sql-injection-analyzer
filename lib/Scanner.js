const fs = require('fs');
var htmlparser = require("htmlparser");
var select = require('soupselect').select;

class Scanner {

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