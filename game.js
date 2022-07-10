// var toolbox = require('./toolbox.js');
const x = 6;
const y = 7;

var game = {
    connect4 : [],
    nbRow : x,
    nbCol : y,
    playerOneChar : "x",
    playerTwoChar : "o",

    init : function() {
        this.connect4 = toolbox.initArrVoid(this.nbRow, this.nbCol, 0);
    },

    showConnect4 : function() {
        const game = document.querySelector("#game");
        game.innerHTML = "";

        var content = "<table>";
            for(var i = 0; i < this.nbRow; i++) {
                content += "<tr class='board'>";
                for(var j = 0; j < this.nbCol; j++) {
                    content += "<td style='border: 2px solid var(--clr-primary); border-radius: 5rem; width:125px; height:125px; margin-right: 1rem'>";
                    if(this.connect4[i][j] === 0) {
                        content += "";
                    } else if(this.connect4[i][j] === 1) {
                        content += "<img src='./images/daifuku.png' style='border-radius: 50%;width:85px; height:85px' />";
                    } if(this.connect4[i][j] === 2) {
                        content += "<img src='./images/cotton-candy.png' style='border-radius: 50%;width:85px; height:85px' />";
                    }
                    content += "</td>";
                }
                content += "</tr>";
            }
            content += "<tr>";
                content += '<td><button type="button" class="btn" onClick="play(0)">Column 1</button></td>';
                content += '<td><button type="button" class="btn" onClick="play(1)">Column 2</button></td>';
                content += '<td><button type="button" class="btn" onClick="play(2)">Column 3</button></td>';
                content += '<td><button type="button" class="btn" onClick="play(3)">Column 4</button></td>';
                content += '<td><button type="button" class="btn" onClick="play(4)">Column 5</button></td>';
                content += '<td><button type="button" class="btn" onClick="play(5)">Column 6</button></td>';
                content += '<td><button type="button" class="btn" onClick="play(6)">Column 7</button></td>';
            content += "</tr>";
        content += "</table>";
        game.innerHTML = content;
    },

    playCell : function(player, row, column) {
        this.connect4[row][column] = player;
    },

    /**
     * Function returning first empty row of a col
     * @param {Number} column return -1 if column full
     * @returns 
     */
    returnEmptyRowCellCol : function(column) {
        for(var i = this.nbRow -1; i >= 0; i--) {
            if(this.checkEmptyCell(i, column)) return i;
        }
        return -1;
    },

    /**
     * Function returning if cell is empty (true/false)
     * @param {Number} row 
     * @param {Number} column 
     * @returns 
     */
    checkEmptyCell : function(row, column) {
        return this.connect4[row][column] === 0;
    },

    pickCol : function() {
        return parseInt(toolbox.pickString('Which cell ?'));
    },

    /**
     * Function checks if player won
     * @param {Number} player 
     * @returns 
     */
    checkEndGame : function(player) {
        if(this.checkRowEndGame(player) || this.checkColEndGame(player) || this.checkDiagEndGame(player)) {
            return true;
        }
        return false;
    },

    /**
     * Function checks if player won on a row
     * @param {Number} player 
     * @returns 
     */
    checkRowEndGame : function(player) {
        for(var i = this.nbRow -1; i >= 0; i--) {
            for(var j = 0; j < this.nbCol -3; j++) {
                if( this.connect4[i][j] === player && 
                    this.connect4[i][j+1] === player && 
                    this.connect4[i][j+2] === player && 
                    this.connect4[i][j+3] === player
                    ) return true;
            }
        }
        return false;
    },

    /**
     * Function checks if a player won in a column
     * @param {Number} player 
     */
    checkColEndGame : function(player) {
        for(var i = 0; i < this.nbCol; i++) {
            for(var j = this.nbRow - 4; j >= 0; j--) {
                if( this.connect4[j][i] === player && 
                    this.connect4[j+1][i] === player && 
                    this.connect4[j+2][i] === player && 
                    this.connect4[j+3][i] === player
                    ) return true;
            }
        }
    },

    /**
     * Function checks if a player won in a diagonal
     * @param {Number} player 
     */
    checkDiagEndGame : function(player) {
        for(var i = this.nbRow -1; i >= 3; i--) {
            for(var j = 0; j < this.nbCol; j++) {
                if( this.connect4[i][j] === player && 
                    this.connect4[i-1][j+1] === player && 
                    this.connect4[i-2][j+2] === player && 
                    this.connect4[i-3][j+3] === player
                    ) return true;
                if( this.connect4[i][j] === player && 
                    this.connect4[i-1][j-1] === player && 
                    this.connect4[i-2][j-2] === player && 
                    this.connect4[i-3][j-3] === player
                    ) return true;
            }
        }
        return false;
    }

}

// module.exports = game;
