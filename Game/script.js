

var board = document.getElementsByClassName('board')[0], // игровое поле
    player = document.getElementsByClassName('gamer')[0], // строка кода
    element, innerElement,
    gamer1 = true, //показывает ,какой игрок сейчас находит
    gameTable = [[null,null,null],[null,null,null],[null,null,null]], //матрица игрока
    nullCount = 9, //кол-во оставшихся ходов
    winner = null;

player.innerText = "Сейчас ходит X";

// Генераци игрового поля
for (var i = 0; i<9; i++){
    element =document.createElement('div');
    element.classList.add('cell');
    element.classList.add("empty")
    innerElement =document.createElement('div');
    innerElement.classList.add('inner-cell');
    innerElement.onclick =tableClick;
    innerElement.setAttribute('x',(i % 3).toString());
    innerElement.setAttribute('y',parseInt(i / 3).toString());
    element.appendChild(innerElement);
    board.appendChild(element);
}
document.getElementsByClassName('button')[0].onclick = reset;

//событие нжатия на ячейке
function tableClick(){
    if (this.innerText == ""){
        this.innerText =gamer1 ? 'X' : 'O';

        if (gamer1) {
            this.style.color = 'yellow'; //для X
        } else {
            this.style.color = 'blue'; // для O
        }
        
        var y = this.getAttribute('y'), 
            x = this.getAttribute('x');
        gameTable[y][x] = gamer1;
        nullCount--;
        this.parentElement.classList.remove('empty');

        this.classList.add(gamer1 ? 'X' : 'O');
        if ((gameTable[y][0] === gamer1 && gameTable[y][1]=== gamer1 && gameTable[y][2]=== gamer1) ||
            (gameTable[0][x] === gamer1 && gameTable[1][x]=== gamer1 && gameTable[2][x]=== gamer1) ||
            (gameTable[0][0] === gamer1 && gameTable[1][1]=== gamer1 && gameTable[2][2]=== gamer1) ||
            (gameTable[2][0] === gamer1 && gameTable[1][1]=== gamer1 && gameTable[0][2]=== gamer1)) {
                winner =gamer1;
        }
        gamer1 =!gamer1;
        player.innerText =gamer1 ? "Сейчас ходит Х" : "Сейчас ходит О";
        if (nullCount == 0 || winner !== null){
            if (winner !== null){
                if (confirm("Победили" + (winner ? "X" : "O") + ".\nЖелаете сыграть еще?")){
                    reset();
                }
            }
            else if (confirm("Игра закончилась в ничью. \nЖелаете сыграть еще?")){
                reset();
            }
        }  
    }
    else{
        alert("Недопустимы ход");

    }
}
// Функция сброса параметров игры
function reset(){
    gamer1 =true;
    gameTable = [[null,null,null],[null,null,null],[null,null,null]];
    nullCount = 9 // кол во оставшихся ходов
    winner = null;
    var table = document.getElementsByClassName("inner-cell");
    for (var i = 0; i < table.length; i++) {
        table[i].innerText = "";
        table[i].parentElement.classList.add('empty'); // установка класса для ячеек при сбросе
        table[i].parentElement.style.backgroundColor = ''; // сброс цвета фона
        table[i].classList.remove('X', 'O'); // удаление классы X и O
    }
    player.innerText = "Сейчас ходит X";
}


