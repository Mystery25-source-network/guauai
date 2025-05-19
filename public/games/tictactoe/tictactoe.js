        const board = document.getElementById("board");
        const statusText = document.getElementById("status");
        const modeSelect = document.getElementById("mode");
        const player1Input = document.getElementById("player1");
        const player2Input = document.getElementById("player2");
        const gamesPlayedText = document.getElementById("gamesPlayed");
        const wins1Text = document.getElementById("wins1");
        const draws1Text = document.getElementById("draws1");
        const losses1Text = document.getElementById("losses1");
        const wins2Text = document.getElementById("wins2");
        const draws2Text = document.getElementById("draws2");
        const losses2Text = document.getElementById("losses2");
        const trophy = document.getElementById("trophy");
        let cells = [];
        let currentPlayer = "X";
        let gameActive = true;
        let player1Name = "Jugador 1";
        let player2Name = "Jugador 2";
        let player1Icon = "X";
        let player2Icon = "O";
        let player1Stats = { wins: 0, draws: 0, losses: 0 };
        let player2Stats = { wins: 0, draws: 0, losses: 0 };
        let totalGames = 0;
        function createBoard() {
            board.innerHTML = "";
            cells = [];
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.addEventListener("click", () => handleMove(i));
                board.appendChild(cell);
                cells.push(cell);
            }
        }
        function handleMove(index) {
                if (!gameActive || cells[index].textContent !== "") return;
                cells[index].textContent = currentPlayer;
                if (checkWinner()) {
                    updateStats(currentPlayer);
                    statusText.textContent = `${currentPlayer} (${currentPlayer === player1Icon ? player1Name : player2Name}) ganó!`;
                    gameActive = false;
                    setTimeout(() => showTrophy(), 500);
                } else if (cells.every(cell => cell.textContent !== "")) {
                    // Empate
                    player1Stats.draws++;
                    player2Stats.draws++;
                    totalGames++;
                    updateUI();
                    statusText.textContent = "¡Empate!";
                    gameActive = false;
                } else {
                    // Cambio de turno
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    statusText.textContent = `Turno de ${(currentPlayer === player1Icon ? player1Name : player2Name)} (${currentPlayer})`;
                    if (modeSelect.value === "bot" && currentPlayer === player2Icon) {
                        setTimeout(botMove, 500);
                    }
                }
            }
        if (modeSelect.value === "bot" && currentPlayer === player2Icon) {
            setTimeout(botMove, 500);
        }
    function botMove() {
        if (!gameActive) return;
      // IA Mejorada: busca ganar o bloquear
        let bestMove = getBestMove();
        handleMove(bestMove);
    }

    function getBestMove() {
      // 1. Ganar si puede
        for (let i = 0; i < 9; i++) {
        if (cells[i].textContent === "") {
        cells[i].textContent = currentPlayer;
        if (checkWinner()) {
            cells[i].textContent = "";
            return i;
        }
        cells[i].textContent = "";
        }
    }

      // 2. Bloquear al rival
        const opponent = currentPlayer === "X" ? "O" : "X";
        for (let i = 0; i < 9; i++) {
        if (cells[i].textContent === "") {
            cells[i].textContent = opponent;
            if (checkWinner()) {
            cells[i].textContent = "";
            return i;
            }
            cells[i].textContent = "";
        }
    }

      // 3. Elegir centro, esquinas o cualquier celda
      const preferredMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
      return preferredMoves.find(i => cells[i].textContent === "");
    }

    function checkWinner() {
      const winCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];
      for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (
          cells[a].textContent &&
          cells[a].textContent === cells[b].textContent &&
          cells[a].textContent === cells[c].textContent
        ) {
          cells[a].classList.add("winner");
          cells[b].classList.add("winner");
          cells[c].classList.add("winner");
          return true;
        }
      }
      return false;
    }

    function updateStats(winnerIcon) {
      totalGames++;
      if (winnerIcon === player1Icon) {
        player1Stats.wins++;
        player2Stats.losses++;
      } else {
        player2Stats.wins++;
        player1Stats.losses++;
      }
      updateUI();
    }

    function updateUI() {
      gamesPlayedText.textContent = totalGames;
      wins1Text.textContent = player1Stats.wins;
      draws1Text.textContent = player1Stats.draws;
      losses1Text.textContent = player1Stats.losses;

      wins2Text.textContent = player2Stats.wins;
      draws2Text.textContent = player2Stats.draws;
      losses2Text.textContent = player2Stats.losses;
    }

    function showTrophy() {
      const winner =
        player1Stats.wins > player2Stats.wins
          ? player1Name
          : player2Stats.wins > player1Stats.wins
          ? player2Name
          : "Empate";

      if (winner !== "Empate") {
        trophy.innerHTML = `🏆<br><strong>${winner}</strong>`;
      } else {
        trophy.innerHTML = '';
      }
    }

    function resetGame() {
      player1Name = player1Input.value || "Jugador 1";
      player2Name = player2Input.value || (modeSelect.value === "bot" ? "Computadora" : "Jugador 2");

      assignIcons();
      createBoard();
      currentPlayer = "X";
      gameActive = true;
      statusText.textContent = `Turno de ${currentPlayer === player1Icon ? player1Name : player2Name} (${currentPlayer})`;
      trophy.innerHTML = '';
    }

    function assignIcons() {
      // Aleatorio o por defecto
      if (Math.random() > 0.5) {
        player1Icon = "X";
        player2Icon = "O";
      } else {
        player1Icon = "O";
        player2Icon = "X";
      }
    }

    // Iniciar con modo IA por defecto
    modeSelect.value = "bot";
    resetGame();
    function ajustarAlturaIframe() {
        const altura = document.body.scrollHeight;
        window.parent.postMessage({ tipo: "ajustarAltura", altura: altura }, "*");
      }

      // Ajustar altura inicial
      window.addEventListener("load", ajustarAlturaIframe);

      // Ajustar altura cuando el DOM cambie (por ejemplo, después de iniciar el juego)
        const observer = new MutationObserver(ajustarAlturaIframe);
        observer.observe(document.body, { childList: true, subtree: true, attributes: true });