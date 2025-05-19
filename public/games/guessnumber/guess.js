
const cardsContainer = document.getElementById("cards");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const pointsDisplay = document.getElementById("points");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");

let selectedCard = null;
let playerPoints = 0;
let kumpelPoints = 0;
let timeout;
let progressTimeout;

const startGame = () => {
    selectedCard = null;
    result.textContent = "";
    cardsContainer.innerHTML = "";
    progressContainer.style.display = "none";
    loading.style.display = "none";

    for (let i = 1; i <= 5; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = i;
        card.addEventListener("click", () => selectCard(card, i));
        cardsContainer.appendChild(card);
    }

    timeout = setTimeout(startProgressBar, 8000); // Si no selecciona en 8s, comienza la cuenta regresiva.
};

const selectCard = (cardElement, value) => {
    if (selectedCard !== null) return;
    clearTimeout(timeout);
    selectedCard = value;
    document.querySelectorAll(".card").forEach(card => card.classList.remove("selected"));
    cardElement.classList.add("selected");

    loading.style.display = "block";

    setTimeout(() => {
        loading.style.display = "none";
        revealCard();
    }, 3000);
};

const revealCard = () => {
    const correct = Math.floor(Math.random() * 5) + 1;
    const msg = `El número era: ${correct}. `;
    if (selectedCard === correct) {
        playerPoints++;
        result.textContent = msg + "¡Adivinaste! 🎉";
    } else {
        kumpelPoints++;
        result.textContent = msg + "¡Fallaste! Punto para Kumpel. 🤖";
    }
    updatePoints();
    setTimeout(startGame, 3000);
};

const startProgressBar = () => {
    let timeLeft = 5;
    progressContainer.style.display = "block";
    progressBar.style.width = "100%";

    progressTimeout = setInterval(() => {
        timeLeft--;
        progressBar.style.width = (timeLeft * 20) + "%";

        if (timeLeft <= 0) {
            clearInterval(progressTimeout);
            if (selectedCard === null) {
                const correct = Math.floor(Math.random() * 5) + 1;
                result.textContent = `⏱ Tiempo agotado. El número era ${correct}. Pierdes un punto.`;
                playerPoints = Math.max(0, playerPoints - 1);
                updatePoints();
                setTimeout(startGame, 3000);
            }
        }
    }, 1000);
};

const updatePoints = () => {
    pointsDisplay.textContent = `Jugador: ${playerPoints} | Kumpel: ${kumpelPoints}`;
};
// Iniciar el juego al cargar
startGame();
function ajustarAlturaIframe() {
    const altura = document.body.scrollHeight;
    window.parent.postMessage({ tipo: "ajustarAltura", altura: altura }, "*");
}

// Ajustar altura inicial
window.addEventListener("load", ajustarAlturaIframe);

// Ajustar altura cuando el DOM cambie (por ejemplo, después de iniciar el juego)
const observer = new MutationObserver(ajustarAlturaIframe);
observer.observe(document.body, { childList: true, subtree: true, attributes: true });