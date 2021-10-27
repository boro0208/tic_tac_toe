
const gameboard = (()=>{
    let container = document.querySelector('.gameboard');   
    let modal = document.getElementById("myModal");
    let boardArray = [0,1,2,3,4,5,6,7,8];
    let resArray = ["1","2","3","4","5","6","7","8","9"];
    let xOrO = true;

    const Player = (name, mark) => {
        getname = () => name;
        getmark = () => mark;
    
        return { getname, getmark }
      }

    const pl1 = Player(document.getElementById("one").value, "X");
    const pl2 = Player(document.getElementById("two").value, "O");


    const addValue = () => {
        if(xOrO){
            xOrO = false;
            return "X";
        }else{
            xOrO = true;
            return "O";
        }
    };
    

    const insertValueAndCheckWinner = (square) => {
        id = square.getAttribute('data-position');
        resArray[id] = square.textContent;
        let winner;
        if (checkRow(resArray[0],resArray[1],resArray[2]) ||
            checkRow(resArray[3],resArray[4],resArray[5]) ||
            checkRow(resArray[6],resArray[7],resArray[8]) ||
            checkRow(resArray[0],resArray[3],resArray[6]) ||
            checkRow(resArray[1],resArray[4],resArray[7]) ||
            checkRow(resArray[2],resArray[5],resArray[8]) ||
            checkRow(resArray[0],resArray[4],resArray[8]) ||
            checkRow(resArray[2],resArray[4],resArray[6])){

            (square.textContent === pl1.getmark())? winner = pl1.getname() :
            winner = pl2.getname() ;
            return winner;
        }

    };

    const closeModal = () => {    
        modal.style.display = "none";
    }

    const msgWinner = (winner) => {
        let msg = document.getElementById("msg");
        if (typeof winner !== "undefined") {       
            msg.innerHTML = "Winner is "+winner;
            modal.style.display = "block";
        }
    }

    const checkRow = (g,h,f) => {
        let winner = false;
            if(g === h && g === f && g !== null){
                winner = true;
            }
        return winner;
    };

    const boardGenerator = () =>{
        container.innerHTML = "";
        resArray = ["1","2","3","4","5","6","7","8","9"];
        xOrO = true;
        boardArray.forEach(item =>{
            let square = document.createElement("div");
            square.classList.add("square");
            square.dataset.position = boardArray.indexOf(item);
            square.addEventListener("click", function () {
                square.innerHTML = addValue();
                msgWinner(insertValueAndCheckWinner(square));
            }, { once: true });
            container.appendChild(square);
        });
    };

    return {boardGenerator, pl1 ,pl2, closeModal};
})();




document.getElementById("start").addEventListener("click", function() {
    document.querySelector(".player1").append(gameboard.pl1.getname());
    document.querySelector(".player2").append(gameboard.pl2.getname());
    document.getElementById("player").remove();
    document.getElementById("game").classList.remove("none");
    gameboard.boardGenerator();
});

document.getElementById("restart").addEventListener("click", function() {
    gameboard.boardGenerator();
});

document.getElementById("rst").addEventListener("click", function() {
    gameboard.boardGenerator();
    gameboard.closeModal();
});