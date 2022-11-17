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
            var inputs = select(dom, 'input');
            var textareas = select(dom, 'textarea')
            var hiddens = select(dom, 'hidden');
            var radios = select(dom, 'radio');
            var selects = select(dom, 'select');
            var checkboxes = select(dom, 'checkbox');

            // Make this look at a website???

            console.log(inputs);

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