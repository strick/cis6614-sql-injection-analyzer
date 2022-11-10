module.exports = {

    // Produce a random SQL reserved word  (From Perl verison of 19 Deadly Sins of Software Security)
    inputGenerator: function() {

        let sqlchars = this.getSqlChars();

        return sqlchars;
    },

    getSqlChars: function() {
        return  [
            '1=1', 
            '2>1', 
            '"fred"="fre"+"d"', 
            'or', 
            'and', 
            'select', 
            'union', 
            'drop', 
            'update', 
            'insert',
            'into',
            'dbo',
            '<',
            '>',
            '=',
            '(',
            ')',
            "'",
            '..',
            '==',
            '#'
        ];
    }
}