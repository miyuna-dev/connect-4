var IA = {
    chooseCol() {
        var arrCol = this.getArrCellPossible();
        var bestCol = 0;
        var arrBestCol = [0];
        for(var i = 1; i < arrCol.length; i++) {
            if(arrCol[i] > arrCol[bestCol]) {
                bestCol = i;
                arrBestCol = new Array();
                arrBestCol.push(i);
            } else if(arrCol[i] === arrCol[bestCol]) {
                arrBestCol.push(i);
            }
        }
        console.log(arrCol);
        // console.log(arrBestCol);
        return arrBestCol[Math.floor(Math.random() * arrBestCol.length)];
    },

    getArrCellPossible : function() {
        var arrCol = [];
        for (var i = 0; i < game.nbCol; i++) {
            arrCol.push(this.getWeightCell(game.returnEmptyRowCellCol(i), i));
        }
        return arrCol;
    },

    getWeightCell : function(row, col) {
        if (row === -1) return 0; // col is full -> weight to return will be 0

        if(this.checkWin(row, col, 2)) return 100;
        if(this.checkWin(row, col, 1)) return 99;

        if(this.lowBlow(row, col, 2)) return 0;


        var weight = 0;
        if(this.posDef(row, col, 1)) weight += 20; //def
        if(this.posDef(row, col, 2)) weight += 20; //atq
        weight += this.getWeightBase(row, col);
        return weight;
    },

    getWeightBase : function(row, col) {
        var weightRow = 0;
        var weightCol = 0;
        switch(row) {
            case 0 : weightRow = 1;
            break;
            case 1 : weightRow = 2;
            break;
            case 2 : weightRow = 3;
            break;
            case 3 : weightRow = 4;
            break;
            case 4 : weightRow = 3;
            break;
            case 5 : weightRow = 2;
            break;
        }
        switch(col) {
            case 0 : weightCol = 1;
            break;
            case 1 : weightCol = 2;
            break;
            case 2 : weightCol = 3;
            break;
            case 3 : weightCol = 3;
            break;
            case 4 : weightCol = 3;
            break;
            case 5 : weightCol = 2;
            break;
            case 6 : weightCol = 1;
            break;
        }
        return weightCol * weightRow;
    },

    posDef : function(row, col, player) {
        var count = 1;
        if(game.connect4[row][col+1] === player) {
            count++;
            if(game.connect4[row][col+2] === player && game.connect4[row][col+3] === 0) count++;
        }

        if(game.connect4[row][col-1] === player) {
            count++;
            if(game.connect4[row][col-2] === player && game.connect4[row][col-3] === 0) count++;
        }
       
        if(count > 2) return true;
    },

    checkWin : function (row, col, player) {
        if(this.checkWinRow(row, col, player)) return true;
        if(this.checkWinCol(row, col, player)) return true;
        if(this.checkWinDiag(row, col, player)) return true;
    },

    checkWinRow : function(row, col, player) {
        var count = 1;
        if(game.connect4[row][col+1] === player) {
            count++;
            if(game.connect4[row][col+2] === player) {
                count++;
                if(game.connect4[row][col+3] === player) {
                    count++;
                }
            }
        }
        if(game.connect4[row][col-1] === player) {
            count++;
            if(game.connect4[row][col-2] === player) {
                count++;
                if(game.connect4[row][col-3] === player) {
                    count++;
                }
            }
        }
        if(count > 3) return true;
    },

    checkWinCol : function(row, col, player) {
        var count = 1;
        if(row < 3) {
            if(game.connect4[row+1][col] === player) {
                count++;
                if(game.connect4[row+2][col] === player) {
                    count++;
                    if(game.connect4[row+3][col] === player) {
                        count++;
                    }
                }
            }
        }
        if(count > 3) return true;
    },
    
    checkWinDiag : function(row, col, player) {
        var count = 1;
        if((row-1 >= 0) && (col+1 <= game.nbCol) && game.connect4[row-1][col+1] === player) {
            count++;
            if((row-2 >=0) && (col+2 <= game.nbCol) && game.connect4[row-2][col+2] === player) {
                count++;
                if((row-3 >=0) && (col+3 <= game.nbCol) && game.connect4[row-3][col+3] === player) {
                    count++;
                }
            }
        }
        if((row+1 < game.nbRow) && (col-1 >= 0) && game.connect4[row+1][col-1] === player) {
            count++;
            if((row+2 < game.nbRow) && (col-2 >= 0) &&game.connect4[row+2][col-2] === player) {
                count++;
                if((row+3 < game.nbRow) && (col-3 >= 0) &&game.connect4[row+3][col-3] === player) {
                    count++;
                }
            }
        }
        if(count > 3) return true;
        var count = 1;
        if((row-1 >=0) && (col-1 >= 0) && game.connect4[row-1][col-1] === player) {
            count++;
            if((row-2 >=0) && (col-2 >= 0) && game.connect4[row-2][col-2] === player) {
            count++;
                if((row-3 >=0) && (col-3 >= 0) && game.connect4[row-3][col-3] === player) {
                count++;
                }
            }
        }
        if((row+1 < game.nbRow) && (col+1 <= game.nbCol) && game.connect4[row+1][col+1] === player) {
            count++;
            if((row+2 < game.nbRow) && (col+2 <= game.nbCol) && game.connect4[row+2][col+2] === player) {
            count++;
                if((row+3 < game.nbRow) && (col+3 <= game.nbCol) && game.connect4[row+3][col+3] === player) {
                count++;
                }
            }
        }
        if(count > 3) return true;
    },

    lowBlow : function(row, col, player) {
        if(row-1 > 0) {
            if(this.checkWin(row-1, col, 1)) return true;
        }
    }
}