const cat = document.getElementById('cat');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');

let isGameOver = false;
let score = 0;

function jump(){
    if(cat.classList != "jump" && !isGameOver){
        cat.classList.add('jump');
    
        setTimeout(() => {
            cat.classList.remove('jump');
        }, 700);
    }
}

document.addEventListener("keydown", function(e){
    if(e.key == "ArrowUp" || e.key == " "){
        jump();
    }
})

function resetGame() {
    isGameOver = false;
    
    cactus.style.animation = 'none';
    setTimeout(() => {
        cactus.style.animation = 'animateCactus 1s linear infinite';
    }, 10);

    clearInterval(isAlive);
    isAlive = setInterval(gameLoop, 10);
    score = 0;
    updateScore();

    scoreInterval = setInterval(increaseScore, 1);
    clearInterval(scoreInterval); 
}

function updateScore() {
    scoreElement.textContent = score; // Memperbarui tampilan skor di elemen HTML
}

function gameLoop() {    
    let catPosition = parseInt(window.getComputedStyle(cat).getPropertyValue('top'));
    let cactusPosition = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));

    // Collision detection
    if (cactusPosition > 0 && cactusPosition < 40 && catPosition > 170) {
        alert("Game Over!");
        isGameOver = true;
        // Jeda interval permainan saat game over
        clearInterval(isAlive);
        // Tunda pengaturan ulang permainan
        setTimeout(resetGame, 10);
    }

    increaseScore();
}

function increaseScore() {
    if (!isGameOver) {
        score++;
        updateScore();
    }
}


let isAlive = setInterval(gameLoop, 10);