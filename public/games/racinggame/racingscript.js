<canvas id="gameCanvas" width="300" height="400"></canvas>

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let goku = { x: 120, y: 320, size: 20 };
    let villains = [];
    let score = 0;
    let gameOver = false;

    function drawPixel(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 4, 4); // Each pixel is 4x4
    }

    function drawGoku(x, y) {
        let colors = {
            skin: "#FFDAB9",
            hair: "black",
            gi: "orange",
            undershirt: "blue",
            eyes: "white"
        };

        // Hair
        drawPixel(x + 4, y, colors.hair);
        drawPixel(x + 12, y, colors.hair);
        drawPixel(x + 8, y + 4, colors.hair);

        // Face
        drawPixel(x + 4, y + 8, colors.skin);
        drawPixel(x + 12, y + 8, colors.skin);
        drawPixel(x + 8, y + 8, colors.eyes);

        // Body
        drawPixel(x + 4, y + 12, colors.undershirt);
        drawPixel(x + 12, y + 12, colors.undershirt);
        drawPixel(x + 8, y + 12, colors.gi);
        drawPixel(x + 8, y + 16, colors.gi);

        // Legs
        drawPixel(x + 4, y + 20, "blue");
        drawPixel(x + 12, y + 20, "blue");
    }

    function drawVillain(x, y, type) {
        let colors = {
            frieza: { skin: "#EEE", armor: "purple" },
            jiren: { skin: "gray", armor: "red" },
            cell: { skin: "green", armor: "black" }
        };

        let c = colors[type];

        drawPixel(x + 4, y, c.skin);
        drawPixel(x + 8, y, c.armor);
        drawPixel(x + 12, y, c.skin);
        drawPixel(x + 4, y + 8, c.armor);
        drawPixel(x + 12, y + 8, c.armor);
        drawPixel(x + 4, y + 16, c.skin);
        drawPixel(x + 12, y + 16, c.skin);
    }

    function moveVillains() {
        villains.forEach(villain => villain.y += 3);
        if (villains.length && villains[0].y > canvas.height) {
            villains.shift();
            score++;
        }
    }

    function checkCollision() {
        for (let villain of villains) {
            if (
                goku.x < villain.x + 20 &&
                goku.x + 20 > villain.x &&
                goku.y < villain.y + 20 &&
                goku.y + 20 > villain.y
            ) {
                gameOver = true;
            }
        }
    }

    function moveLeft() {
        if (goku.x > 10) goku.x -= 20;
    }

    function moveRight() {
        if (goku.x < canvas.width - goku.size - 10) goku.x += 20;
    }

    // Soporte para teclado (A, D, flechas)
    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
            moveLeft();
        } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
            moveRight();
        }
    });

    // Soporte para movimiento con el mouse
    canvas.addEventListener("mousemove", function (e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        goku.x = Math.max(0, Math.min(mouseX - goku.size / 2, canvas.width - goku.size));
    });

    function update() {
        if (gameOver) {
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.fillText("Game Over! Score: " + score, 50, 200);
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGoku(goku.x, goku.y);
        villains.forEach(v => drawVillain(v.x, v.y, v.type));
        moveVillains();
        checkCollision();
        if (Math.random() < 0.02) {
            let types = ["frieza", "jiren", "cell"];
            villains.push({
                x: Math.random() * (canvas.width - 20),
                y: 0,
                size: 20,
                type: types[Math.floor(Math.random() * types.length)]
            });
        }
        requestAnimationFrame(update);
    }
    update();

function ajustarAlturaIframe() {
    const altura = document.body.scrollHeight;
    window.parent.postMessage({ tipo: "ajustarAltura", altura: altura }, "*");
}

// Ajustar altura inicial
window.addEventListener("load", ajustarAlturaIframe);

// Ajustar altura cuando el DOM cambie (por ejemplo, después de iniciar el juego)
const observer = new MutationObserver(ajustarAlturaIframe);
observer.observe(document.body, { childList: true, subtree: true, attributes: true });