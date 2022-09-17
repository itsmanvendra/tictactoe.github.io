var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

window.onload = function(){
    setGame();
}
function setGame(){
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]
    //used to create div and blocks !
    for(let r = 0; r < 3; r++){
        for(let c = 0; c < 3; c++){
            //<div id = "0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-"+ c.toString();
        
            tile.classList.add("tile");
            if(r == 0 || r == 1){
                tile.classList.add("horizontal-line");
            }
            if(c == 0 || c == 1){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);
        }
    }
}

function setTile(){
    if (gameOver){
        return;
    }
    let coords = this.id.split("-") //"1-1" -> ["1", "1"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    //if that position is already marked return
    if(board[r][c] != ' '){
        return;
    }
    board[r][c] = currPlayer;
    this.innerText = currPlayer;

    //for alternate X and O

    if(currPlayer == playerO){
        currPlayer = playerX;
    }
    else{
        currPlayer = playerO;
    }

    //checkWinner
    checkWinner();
}

function checkWinner(){
    //horizontally
    for(let r = 0; r<3; r++){
        if(board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' '){
            for(let i = 0; i<3; i++){
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }

    }
    //vertically
    for(let c = 0; c<3; c++){
        if(board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' '){
            for(let i = 0; i<3; i++){
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }

    }
    //diagonally
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' '){
        for(let i = 0; i<3; i++){
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    //anti-diagonally
    if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' '){
        //"0-2"
        let tile = document.getElementById("0-2");
        tile.classList.add("winner");
        //"1-1"
        tile = document.getElementById("1-1");
        tile.classList.add("winner");
        //"2-0"
        tile = document.getElementById("2-0");
        tile.classList.add("winner");
        gameOver = true;
        return;
    }
    
        
}