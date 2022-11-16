const DbConnector = require('../db').DbConnector;

module.exports = {
    
    index: function (request, response, next) {

        response.render('scanner/index', {

        });
    },
}