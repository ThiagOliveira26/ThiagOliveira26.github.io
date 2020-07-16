let canvas = document.getElementById("snake");
let ctx = canvas.getContext("2d");
let box = 16; // tamanho do quadradinho
let snake = []; //criando a cobrinha como lista
var GameOver = false;
var pontos = 0;
//posicao 16 para ser criado no centro do jogo.
snake[0] = {
    x: 16*box,
    y: 16*box
}
let direction = "right"; //inicio do movimento para direita

let food = {
    x : Math.floor(Math.random() * 31 + 1) * box,
    y : Math.floor(Math.random() * 31 + 1) * box
}

function criarBG(){
    ctx.fillStyle = "#D3D3D3";
    ctx.fillRect(0, 0, 32*box, 32*box);
}

function criarCobrinha(){
        ctx.strokeStyle = "#363636";
        ctx.strokeRect(snake[0].x, snake[0].y, box, box);
        ctx.fillStyle = "#696969";
        ctx.fillRect(snake[0].x, snake[0].y, box, box);
    for (i=1;i<snake.length;i++){
        ctx.fillStyle = "gray";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

//a cada keydown.. que é o evento especificado, vai para funcao update.
document.addEventListener('keydown',update);

//funcao analisa a tecla clicada para mudar sentido.
function update (event){

        if (snake.length > 2){
        var xFim = (snake[snake.length-1].x == snake[snake.length-2].x);
        var yFim = (snake[snake.length-1].y == snake[snake.length-2].y);
        var xInicio = (snake[0].x == snake[1].x);
        var yInicio = (snake[0].y == snake[1].y);
        }
    if(event.keyCode == 37){
        if (direction != "right") direction = "left";
        else{
            if (snake.length < 4){
                snake.reverse();
                direction = "left";
            }
            else{
                if ((yFim) && (yInicio) && (snake[0].y != snake[snake.length-1].y) &&
                    (snake[snake.length-1].x > snake[snake.length-2].x))
                    snake.reverse();
                else{
                    snake.reverse();
                    direction = "left";
                }
            }
        }
    }
    if(event.keyCode == 38){
        if (direction != "down") direction = "up";
        else{
            if (snake.length < 4){
                snake.reverse();
                direction = "up";
            }
            else{
                if ((xFim) && (xInicio) && (snake[0].x != snake[snake.length-1].x) &&
                    (snake[snake.length-1].y > snake[snake.length-2].y))
                    snake.reverse();
                else{
                    snake.reverse();
                    direction = "up";
                }
            }
        }
    }
    if(event.keyCode == 39 ){
        if (direction != "left") direction = "right";
        else{
            if (snake.length < 4){
                snake.reverse();
                direction = "right";
            }
            else{
                if ((yFim) && (yInicio) && (snake[0].y != snake[snake.length-1].y) &&
                    (snake[snake.length-1].x < snake[snake.length-2].x))
                    snake.reverse();
                else{
                    snake.reverse();
                    direction = "right";
                }
            }
        }
    }
    if(event.keyCode == 40){
        if (direction != "up") direction = "down";
        else{
            if (snake.length < 4){
                snake.reverse();
                direction = "down";
            }
            else{
                if ((xFim) && (xInicio) && (snake[0].x != snake[snake.length-1].x) &&
                    (snake[snake.length-1].y < snake[snake.length-2].y))
                    snake.reverse();
                else{
                    snake.reverse();
                    direction = "down";
                }
            }
        }
    }
}

function iniciarJogo(){
    
    let bd = document.getElementById("snakeborda").checked;

    if (bd != "1"){
        if(snake[0].x > 31 * box ) snake[0].x =0;
        if(snake[0].x < 0) snake[0].x =32*box;
        if(snake[0].y > 31 * box) snake[0].y =0;
        if(snake[0].y < 0 ) snake[0].y =32*box;
    }
    else{
        if ((snake[0].x > 31 * box ) || (snake[0].x < 0) || (snake[0].y > 31 * box) || (snake[0].y < 0 ))
            FimDeJogo();
    }

    for (i=1; i< snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y)
            FimDeJogo();
    }

    criarBG();
    criarCobrinha();  
    drawFood();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right")    snakeX += box;
    if(direction == "left")     snakeX -= box;
    if(direction == "up")       snakeY -= box;
    if(direction == "down")     snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //retira o ultimo elemento do array.
    }
    else{
        var bad = 0;

        do{
            var fx = Math.floor(Math.random() * 31 + 1) * box;
            var fy = Math.floor(Math.random() * 31 + 1) * box;

            for (i=0; i<snake.length;i++){
                if (fx==snake[i].x && fy==snake[i].y){
                    bad = 1;    
                    break;
                }
            }
        }while(bad==1)
        food.x = fx;
        food.y = fy;
        Pontuacao();
    }

    //a atualizacao da direcao, é a nova cabeça. dando noçao de movimento.
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

//verifica checkbox
let bStart = document.getElementById("startStop");
if (bStart.value == '1')
    var jogo = setInterval(iniciarJogo, 100);

if (bStart.innerHTML == 'Restart'){
    bStart.value = '0';
    GameOver = false;
    snake[0] = {
        x: 16*box,
        y: 16*box
    }
    direction = "right";
    iniciarJogo();
}

function ModifyBtn(){
    if (!GameOver){
        if (bStart.value == '1'){
            clearInterval(jogo);
            bStart.value = '0';
            bStart.innerHTML = 'Continuar';
        }
        else{
            jogo = setInterval(iniciarJogo, 100);
            bStart.value = '1';
            bStart.innerHTML = 'Pausar';
        }
    }
    if (bStart.innerHTML == 'Restart'){
        pontos = 0;
        document.getElementById("score").innerHTML = pontos;
        bStart.value = '0';
        GameOver = false;
        snake = [];
        snake[0] = {
            x: 16*box,
            y: 16*box
        }
        direction = "right";
        bStart.innerHTML = 'Start';
        iniciarJogo();
    }
}

function FimDeJogo(){
    alert("Pontuação Final: "+pontos);
    clearInterval(jogo);
    GameOver = true;
    bStart.innerHTML = 'Restart';
    alert("game over");
}

function Pontuacao(){
    pontos = pontos + 10;
    let p = document.getElementById("score");
    p.innerHTML = pontos;
}