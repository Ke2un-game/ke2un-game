document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const scoreDisplay = document.getElementById("score");
    const levelDisplay = document.getElementById("level");
    const timerDisplay = document.getElementById("timer");
    const matchSound = document.getElementById("match-sound");

    let score = 0;
    let level = 1;
    let timeLeft = 60;
    let gameInterval;

    const letters = ["K", "E", "2", "U", "N"];
    const colors = ["red", "blue", "green", "orange", "purple"];

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function createBox(letter, color) {
        const box = document.createElement("div");
        box.classList.add("box", color);
        box.textContent = letter;
        box.draggable = true;

        box.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.textContent);
        });

        box.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        box.addEventListener("drop", (event) => {
            event.preventDefault();
            const droppedLetter = event.dataTransfer.getData("text");

            if (event.target.textContent === droppedLetter) {
                event.target.classList.add("hidden");

                // Ensure sound plays correctly
                matchSound.currentTime = 0; 
                matchSound.play().catch(error => console.log("Audio play error:", error));

                score += 10;
                scoreDisplay.textContent = score;

                if (score % 50 === 0) {
                    level++;
                    levelDisplay.textContent = level;
                }
            }
        });

        return box;
    }

    function generateGameBoard() {
        let randomLetters = Array(25).fill().map(() => letters[Math.floor(Math.random() * letters.length)]);
        shuffleArray(randomLetters);

        gameBoard.innerHTML = "";
        randomLetters.forEach(letter => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            gameBoard.appendChild(createBox(letter, color));
        });
    }

    function startTimer() {
        gameInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                alert("Time's up! Your score: " + score);
            }
        }, 1000);
    }

    function resetGame() {
        clearInterval(gameInterval);
        score = 0;
        level = 1;
        timeLeft = 60;
        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        timerDisplay.textContent = timeLeft;
        generateGameBoard();
        startTimer();
    }

    generateGameBoard();
    startTimer();
});
