// var readline = require('readline-sync');
var toolbox = {
    // pickString : function(txt) {
    //     return readline.question(txt);
    // },

    /**
     * Initialize arr of arr from row and column in param
     * @param {Number} nbRow 
     * @param {Number} nbCol 
     * @param {*} car 
     */
    initArrVoid : function(nbRow, nbCol, car = '') {
        var arr = [];
        for(var i = 0; i < nbRow; i++) {
            var row = [];
            for(var j = 0; j < nbCol; j++) {
                row.push(car);
            }
            arr.push(row);
        }
        return arr;
    }
}

// module.exports = toolbox;