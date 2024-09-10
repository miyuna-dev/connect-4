const turn = document.querySelector("#turn");
const alert = document.querySelector(".alert");
const msgP1 = document.querySelector("#p1");
const msgP2 = document.querySelector("#p2");
var playerOnGoing = 1;
var endGame = false;

var pointP1 = 0;
var pointP2 = 0;

var isIAon = false;

initArray();
// placeForTest(5);
// placeForTest(6);
// placeForTest(4);
// placeForTest(5);
// placeForTest(4);
// placeForTest(3);
// placeForTest(3);
// placeForTest(3);
// placeForTest(1);
// placeForTest(3);

function startIA() {
    isIAon = !isIAon;
}

function play(column) {
    playCell(column);
    if(isIAon) {
        columnIA = IA.chooseCol();
        playCell(columnIA);
    }
}

function placeForTest(column) {
    play(column); 
}


function playCell(column) {
    if(!endGame) {
        var emptyRow = game.returnEmptyRowCellCol(column);
        if(emptyRow !== -1) {
            game.playCell(playerOnGoing, emptyRow, column);
            game.showConnect4();
            if(game.checkEndGame(playerOnGoing)) {
                console.log('Game Over');
                console.log('Player ' + playerOnGoing + ' won');
                manageEndGame();
            }
        
            if(playerOnGoing === 1) {
                playerOnGoing = 2;
                turn.innerHTML = "Player 2's Turn";
            } else {
                playerOnGoing = 1;
                turn.innerHTML = "Player 1's Turn";
            }
        }
    }
}

function initArray() {
    endGame = false;
    playerOnGoing = 1;
    if(playerOnGoing === 1) {
        playerOnGoing = 1;
        turn.innerHTML = "Player 1's Turn";
    }
    alert.classList.add("d-none");
    var contentP1 = "<img src='./images/daifuku.png' style='border-radius: 50%; width: 125px; height: 125px;' /><br />";
    contentP1 += pointP1;
    msgP1.innerHTML = contentP1;

    var contentP2 = "<img src='./images/cotton-candy.png' style='border-radius: 50%; width:125px; height: 125px;' /><br />";
    contentP2 += pointP2;
    msgP2.innerHTML = contentP2;
    // var contentP2 =
    game.init();
    game.showConnect4();
}

function manageEndGame() {
    endGame = true;
    var contentAlert = 'Game Over - Winner is Player ' + playerOnGoing + '<br />';
    contentAlert += '<button type="button" class="btn" onClick="initArray()">Play Again</button>';
    alert.innerHTML = contentAlert;
    alert.classList.remove("d-none");
    if(playerOnGoing === 1) {
        pointP1++;
    } else {
        pointP2++;
    }
}