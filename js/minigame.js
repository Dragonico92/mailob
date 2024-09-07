let score = 0;
let lives = 3;
let timer = 60;
let gameInterval;
let heartInterval;
let preparationTimeout;
const heartCount = 5; // Número de corazones que aparecen en la pantalla

document.getElementById('start-game').addEventListener('click', startPreparation);

function startPreparation() {
    document.getElementById('preparation').style.display = 'block';
    document.getElementById('start-game').style.display = 'none';

    let countdown = 3;
    document.getElementById('countdown').textContent = countdown;

    preparationTimeout = setInterval(() => {
        countdown--;
        document.getElementById('countdown').textContent = countdown;

        if (countdown <= 0) {
            clearInterval(preparationTimeout);
            document.getElementById('preparation').style.display = 'none';
            startGame();
        }
    }, 1000);
}

function startGame() {
    score = 0;
    lives = 3;
    timer = 60;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timer;
    updateLivesDisplay();

    document.getElementById('game-area').innerHTML = ''; // Limpiar el área del juego

    gameInterval = setInterval(updateGame, 1000);
    heartInterval = setInterval(createHeart, 1000);
}

function updateGame() {
    timer--;
    document.getElementById('timer').textContent = timer;

    if (timer <= 0 || lives <= 0) {
        clearInterval(gameInterval);
        clearInterval(heartInterval);
        alert('Juego terminado. Tu puntuación es: ' + score);
        return;
    }

    // Aumentar la velocidad de aparición de corazones cada minuto
    if (timer % 60 === 0) {
        clearInterval(heartInterval);
        heartInterval = setInterval(createHeart, Math.max(500, 1000 - (score / 10) * 50));
    }
}

function createHeart() {
    if (lives <= 0) return;

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.top = Math.random() * 80 + 'vh';
    heart.style.left = Math.random() * 100 + '%';

    heart.addEventListener('click', function() {
        score++;
        document.getElementById('score').textContent = score;
        this.remove(); // Elimina el corazón al hacer clic
    });

    document.getElementById('game-area').appendChild(heart);

    // Eliminar el corazón después de 1.5 segundos si no ha sido clicado
    setTimeout(function() {
        if (heart.parentElement) {
            heart.remove();
            loseLife();
        }
    }, 1500);
}

function loseLife() {
    if (lives > 0) {
        lives--;
        updateLivesDisplay();
    }
}

function updateLivesDisplay() {
    const lifeElements = document.querySelectorAll('#lives .life');
    lifeElements.forEach((life, index) => {
        life.style.visibility = (index < lives) ? 'visible' : 'hidden';
    });
}
