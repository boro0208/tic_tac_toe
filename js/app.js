const squares = document.querySelectorAll(".square");
let xOrO = true;
let par = "X";

squares.forEach(function (item, idx) {
    item.addEventListener('click', function () {
        if(xOrO){
            par = "X";
            xOrO = false;
        }else{
            par = "O";
            xOrO = true;
        }
        document.body.querySelector('.square[data-id="'+idx+'"]').insertAdjacentText('afterBegin',par);
    }, { once: true });
});

document.getElementById("start").addEventListener("click", function() {
    document.querySelector(".player1").append(document.getElementById("one").value);
    document.querySelector(".player2").append(document.getElementById("two").value);
    document.getElementById("player").remove();
    document.getElementById("game").classList.remove("none");
    addListenerOnButtons();
});

document.getElementById("restart").addEventListener("click", function() {
    location.reload();
});