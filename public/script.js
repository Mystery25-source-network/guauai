
//=======================================> codgo N° 5 completo y funcional <==========================================================//


        // Función para mostrar los mensajes
        function displayMessage(message, sender) {
            const chatLog = document.getElementById("chat-log");

            const messageWrapper = document.createElement("div");
            messageWrapper.classList.add("message-wrapper", sender);

            // Avatar solo para el bot
            if (sender === "assistant") {
                const avatar = document.createElement("img");
                avatar.src = "images/image-modified.png";
                avatar.alt = "Avatar del bot";
                avatar.style.width = "30px";
                avatar.style.height = "30px";
                avatar.style.borderRadius = "50%";
                avatar.style.marginRight = "8px";
                messageWrapper.appendChild(avatar);
            }

            const messageElement = document.createElement("div");
            messageElement.classList.add("message", sender);
            messageElement.innerText = message;

            // Botón altavoz
            const speakerButton = document.createElement("button");
            const speakerIcon = document.createElement("img");
            speakerIcon.src = "https://img.icons8.com/ios/452/speaker.png"; // URL de la imagen del altavoz
            speakerIcon.alt = "Reproducir mensaje";
            speakerIcon.style.width = "20px"; // Ajusta el tamaño de la imagen
            speakerIcon.style.height = "20px"; // Ajusta el tamaño de la imagen
            speakerButton.appendChild(speakerIcon);
            speakerButton.onclick = () => speakMessage(message);
            speakerButton.style.marginLeft = "8px"; // Espaciado si es necesario
            messageElement.appendChild(speakerButton);

            messageWrapper.appendChild(messageElement);
            chatLog.appendChild(messageWrapper);
            chatLog.scrollTop = chatLog.scrollHeight;
        }

        // Función para mostrar el mensaje del bot con un efecto de escritura progresiva
        function displayBotMessageProgresivamente(message) {
            const chatLog = document.getElementById("chat-log");

            const messageWrapper = document.createElement("div");
            messageWrapper.classList.add("message-wrapper", "assistant");

            // Avatar del bot
            const avatar = document.createElement("img");
            avatar.src = "images/image-modified.png";
            avatar.alt = "Avatar del bot";
            avatar.style.width = "30px";
            avatar.style.height = "30px";
            avatar.style.borderRadius = "50%";
            avatar.style.marginRight = "8px";
            messageWrapper.appendChild(avatar);

            const messageElement = document.createElement("div");
            messageElement.classList.add("message", "assistant");

            // Botón altavoz (se añade después del texto con delay)
            const speakerButton = document.createElement("button");
            const speakerIcon = document.createElement("img");
            speakerIcon.src = "images/speaker.png"; // URL de la imagen del altavoz
            speakerIcon.alt = "Reproducir mensaje";
            speakerIcon.style.width = "20px"; // Ajusta el tamaño de la imagen
            speakerIcon.style.height = "20px"; // Ajusta el tamaño de la imagen
            speakerButton.appendChild(speakerIcon);
            speakerButton.onclick = () => speakMessage(message);
            speakerButton.style.marginLeft = "8px"; // Espaciado si es necesario
            speakerIcon.style.background = "transparent"; // Asegura que la imagen no tenga fondo
            speakerIcon.style.pointerEvents = "none"; // Para evitar que el clic sea interceptado por la imagen
            speakerButton.style.padding = "0";
            speakerButton.style.marginLeft = "8px";
            speakerButton.style.cursor = "pointer";
            messageElement.appendChild(speakerButton);
            messageWrapper.appendChild(messageElement);
            chatLog.appendChild(messageWrapper);
            escribirMensajeProgresivo(message, messageElement, speakerButton);
        }

        // Función para escribir el mensaje de forma progresiva
        function escribirMensajeProgresivo(mensaje, elemento, speakerButton) {
            let index = 0;
            const intervalo = setInterval(() => {
                elemento.innerText = mensaje.slice(0, index);
                index++;
                if (index > mensaje.length) {
                    clearInterval(intervalo);
                    elemento.appendChild(speakerButton); // Agrega el botón al final del texto
                }
            }, 50);
        }
// Lógica del botón de enviar
document.getElementById("submit-btn").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;  // No enviar si el input está vacío

    // Ocultar el mensaje de bienvenida si aún está visible
    const welcomeMessage = document.getElementById("welcome-message");
    if (welcomeMessage && welcomeMessage.style.display !== 'none') {
        welcomeMessage.style.transition = 'opacity 0.5s ease';
        welcomeMessage.style.opacity = '0';
        setTimeout(() => {
            welcomeMessage.style.display = 'none';
        }, 500);
    }

    // Mostrar mensaje del usuario
    displayMessage(userInput, 'user');
    document.getElementById("user-input").value = "";

    // Evaluamos la entrada del usuario
    let assistantResponse = "";
    let needsAPI = false;

    // Lista de respuestas amigables
    const saludos = [
        "¡Hola! ¿Cómo estás? 😊",
        "¡Qué tal! Estoy muy bien, gracias por preguntar. ¿Y tú?",
        "¡Hola! Todo bien por aquí, ¿y tú qué tal?",
        "¡Hey! Estoy muy bien, ¿cómo estás tú?",
        "¡Hola! ¿Todo en orden por tu lado?",
        "¡Hola! Qué gusto saludarte, ¿cómo va todo?",
        "¡Qué onda! Todo bien, ¿y tú?",
        "¡Hola! Estoy excelente, gracias. ¿Y tú?",
        "¡Hola! ¿Qué tal todo por ahí?",
        "¡Saludos! ¿Cómo te encuentras?",
        "¡Hola! Todo en paz, ¿y tú?",
        "¡Hey! Aquí todo bien, ¿cómo vas?",
        "¡Hola! ¿Cómo va todo? 😊",
        "¡Qué tal! Estoy genial, ¿y tú?",
        "¡Hola! Todo tranquilo, ¿y tú?"
    ];
    const respuestasSaludo = [
        "¡Hola! ¿Cómo te encuentras? 😊",
        "¡Qué tal! Estoy muy bien, gracias por preguntar. ¿Y tú?",
        "¡Hola! Todo bien por aquí, ¿y tú qué tal?",
        "¡Hey! Estoy muy bien, ¿cómo estás tú?",
        "¡Hola! ¿Todo en orden por tu lado?",
        "¡Hola! Qué gusto saludarte, ¿cómo va todo?",
        "¡Qué onda! Todo bien, ¿y tú?",
        "¡Hola! Estoy excelente, gracias. ¿Y tú?",
        "¡Hola! ¿Qué tal todo por ahí?",
        "¡Saludos! ¿Cómo te encuentras?",
        "¡Hola! Todo en paz, ¿y tú?",
        "¡Hey! Aquí todo bien, ¿cómo vas?",
        "¡Hola! ¿Cómo va todo? 😊",
        "¡Qué tal! Estoy genial, ¿y tú?",
        "¡Hola! Todo tranquilo, ¿y tú?"
    ];
    // Lista de respuestas sobre lo que puede hacer el asistente
    const respuestasHabilidades = [
        "Puedo ayudarte a responder preguntas, jugar juegos, generar imágenes y mucho más. ¿Qué te gustaría hacer?",
        "¡Puedo hacer muchas cosas! Desde responder preguntas hasta generar imágenes o ayudarte con tareas. ¿Qué necesitas?",
        "Soy capaz de responder preguntas, ayudarte a aprender cosas nuevas, e incluso generar imágenes. ¿En qué te gustaría que te ayudara?",
        "Puedo hacer muchas cosas, como responder a tus preguntas, jugar algunos juegos, o incluso crear imágenes. ¿En qué te gustaría que te asistiera?",
        "¡Tengo muchas habilidades! Responder preguntas, generar imágenes y hasta ayudarte con juegos. ¿Qué necesitas?",
        "Puedo ayudarte con preguntas, tareas, juegos y mucho más. ¿Qué te gustaría hacer hoy?",
        "Soy un asistente versátil: puedo responder preguntas, hacer juegos y hasta ayudarte con ideas creativas. ¿Cómo puedo asistirte?",
        "¡Puedo hacer todo lo que imagines! Desde responder preguntas hasta crear imágenes o juegos. ¿Qué te gustaría hacer?",
        "Tengo muchas funciones: responder preguntas, generar imágenes, ayudarte con juegos y más. ¿En qué puedo ayudarte ahora?",
        "Puedo hacer muchas cosas, como resolver dudas, jugar y hasta generar contenido visual. ¿Qué te gustaría probar?",
        "¡Puedo ayudarte con varias cosas! Desde responder preguntas hasta crear imágenes o incluso jugar. ¿Qué te interesa hoy?",
        "Puedo responder a tus preguntas, generar contenido visual, ayudarte con tareas y hasta jugar algunos juegos. ¿Qué prefieres hacer?",
        "¡Puedo hacer mucho! Desde resolver preguntas hasta crear imágenes y ayudarte con ideas creativas. ¿Qué te gustaría hacer?",
        "Puedo ayudarte en muchas áreas, como responder preguntas, crear imágenes, y más. ¿En qué te gustaría que te ayude?",
        "¡Puedo ayudarte con muchas cosas! Responder preguntas, generar imágenes, y mucho más. ¿Qué te gustaría explorar?",
        "Soy un asistente multifuncional. Responder preguntas, crear imágenes, jugar juegos y mucho más. ¿Qué te gustaría hacer hoy?"
    ];
    // Lista de respuestas sobre cómo fue creado el asistente
    const respuestasCreacion = [
        "Fui creado usando programación avanzada y grandes cantidades de datos. Mi propósito es interactuar y ayudar a las personas.",
        "Fui desarrollado por un equipo de ingenieros y expertos en inteligencia artificial, utilizando programación y análisis de datos.",
        "Fui creado por OpenAI, utilizando técnicas avanzadas de aprendizaje automático, que me permiten interactuar y aprender de las conversaciones.",
        "Soy el resultado de años de investigación en inteligencia artificial. Fui entrenado con grandes volúmenes de texto para entender y responder preguntas.",
        "Fui diseñado por ingenieros que me entrenaron usando datos y algoritmos de inteligencia artificial, lo que me permite comprender y responder a las preguntas de manera eficiente.",
        "Fui creado con la ayuda de programación avanzada y aprendizaje automático. Mi entrenamiento me permite aprender y adaptarme a las conversaciones con los usuarios.",
        "Mi creación se basa en la inteligencia artificial, utilizando algoritmos de aprendizaje profundo para entender y generar respuestas a preguntas.",
        "Fui creado con datos y programación avanzada, aprendiendo de patrones y conversaciones para poder interactuar de manera natural y útil.",
        "Me desarrollaron utilizando tecnología de inteligencia artificial y procesamiento de lenguaje natural, para que pueda responder preguntas y asistir de manera eficaz.",
        "Mi creación es el fruto de la programación avanzada y el análisis de grandes cantidades de texto, lo que me permite interactuar y ayudarte con diversos temas.",
        "Soy una inteligencia artificial creada por OpenAI, entrenada para entender el lenguaje humano y proporcionar respuestas útiles y coherentes.",
        "Fui creado por un equipo de desarrolladores que me entrenaron con millones de ejemplos de texto para poder comunicarme de manera efectiva.",
        "Mi base es un modelo de inteligencia artificial entrenado con grandes volúmenes de texto, lo que me permite aprender y mejorar constantemente.",
        "Fui creado a partir de tecnologías avanzadas de inteligencia artificial, donde los algoritmos de aprendizaje me ayudan a entender y generar respuestas.",
        "Me desarrollaron usando algoritmos de aprendizaje automático y procesamiento de lenguaje natural, lo que me permite responder a preguntas y tener conversaciones."
    ];
    const respuestascreador = [
        "Fui creado por Miguel Vila Riascos, un estudiante de ingeniería de sistemas con mucha curiosidad.",
        "Mi creador es Miguel Jose Vila Riascos, un apasionado de la tecnología y la inteligencia artificial.",
        "Fui desarrollado por Vila Miguel como parte de su proyecto de programación.",
        "Miguel Vila, un estudiante de ingeniería, me diseñó para ayudarte en lo que necesites.",
        "Mi existencia se la debo a Miguel Vila Riascos, quien me programó con dedicación y creatividad.",
        "Fui construido por Miguel José Vila Riascos, un joven desarrollador interesado en la asistencia virtual.",
        "Miguel Vila Riascos es quien escribió todas mis líneas de código. ¡Todo gracias a él!",
        "Mi creador es Miguel Vila, un entusiasta de la informática que quiso darme vida.",
        "Fui diseñado y programado por Vila Riascos Miguel José, un estudiante con visión e iniciativa.",
        "Vila Riascos Miguel  me desarrolló como parte de su aprendizaje en ingeniería de sistemas.",
        "Me programó con dedicación para ayudarte en todo lo que necesites. ¡Aquí estoy!"
    ];
    // Función que se ejecuta cuando el usuario dice "hola como estas"
    if (userInput.toLowerCase().includes("hola como estas")) {
        // Seleccionar una respuesta aleatoria de la lista de saludos
        const randomIndex = Math.floor(Math.random() * saludos.length);
        assistantResponse = saludos[randomIndex];
        needsAPI = false;
    }
    else if (userInput.toLowerCase().includes("hola")) {
        // Seleccionar una respuesta aleatoria de la lista de saludos
        const randomIndex = Math.floor(Math.random() * respuestasSaludo.length);
        assistantResponse = respuestasSaludo[randomIndex] + " ¿En qué puedo ayudarte hoy?";
        needsAPI = false;
    } else if (userInput.toLowerCase().includes("quien es tu creador")) {
        assistantResponse = respuestascreador[Math.floor(Math.random() * respuestascreador.length)];
        needsAPI = false;
    }  else if (userInput.toLowerCase().includes("que puedes hacer")) {
        // Seleccionar una respuesta aleatoria de la lista de habilidades
        const randomIndex = Math.floor(Math.random() * respuestasHabilidades.length);
        assistantResponse = respuestasHabilidades[randomIndex];
        needsAPI = false;
    } else if (userInput.toLowerCase().includes("como te crearon")) {
        // Seleccionar una respuesta aleatoria de la lista de creación
        const randomIndex = Math.floor(Math.random() * respuestasCreacion.length);
        assistantResponse = respuestasCreacion[randomIndex];
        needsAPI = false;
    } else if (userInput.toLowerCase().includes("quien es miguel vila")) {
        assistantResponse = "Miguel Vila es un programador y estudiante de ingeniería de sistemas.";
        needsAPI = false;
    } else if (userInput.toLowerCase().includes("qr") || userInput.toLowerCase().includes("generar código qr")) {
        const url = extractUrl(userInput);
        if (url) {
            assistantResponse = "Aquí está el código QR para la URL que mencionaste:";
            displayBotMessageProgresivamente(assistantResponse);
            displayQRCode(url);
            return;
        } else {
            assistantResponse = "No pude encontrar una URL válida para generar el código QR. Por favor, ingresa una URL.";
            needsAPI = false;
        }
    } else if (userInput.toLowerCase().includes("imagen") || userInput.toLowerCase().includes("generar imagen")) {
        const prompt = extractPrompt(userInput);
        if (prompt) {
            assistantResponse = "Aquí está la imagen que solicitaste:";
            displayBotMessageProgresivamente(assistantResponse);
            generateImage(prompt);
            return;
        } else {
            assistantResponse = "Por favor, proporciona una descripción de la imagen que te gustaría generar.";
            needsAPI = false;
        }
    } else {
        needsAPI = true;
    }

    // Si no se necesita la API, muestra la respuesta generada automáticamente
    if (!needsAPI) {
        displayBotMessageProgresivamente(assistantResponse);
    } else {
        // Llamar a la API si no hay respuesta predefinida
        fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer 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',
                'HTTP-Referer': '<your_site_url>',
                'X-Title': '<your_site_name>',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-r1:free',
                messages: [{ role: 'user', content: userInput }],
            }),
        })
            .then(res => res.json())
            .then(data => {
                const markdownText = data.choices?.[0]?.message?.content || 'No se recibió respuesta.';
                displayBotMessageProgresivamente(markdownText);
            })
            .catch(error => {
                displayBotMessageProgresivamente("Ocurrió un error al contactar al servicio: " + error.message);
            });
    }
            
            // Mostrar la respuesta del bot
        //    displayBotMessageProgresivamente(assistantResponse);
        });

        // Lógica para enviar mensaje con la tecla "Enter"
        document.getElementById("user-input").addEventListener("keydown", function (event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                document.getElementById("submit-btn").click();
            }
        });

        // Función para extraer una URL del mensaje
        function extractUrl(text) {
            const urlPattern = /https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\/\S*)?|\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}\b/g;
            const result = text.match(urlPattern);
            return result ? result[0] : null;
        }

        // Función para extraer el "prompt" de la imagen
        function extractPrompt(text) {
            const promptPattern = /generar imagen de (.+)/i;
            const result = text.match(promptPattern);
            return result ? result[1] : null;
        }

        // Función para generar un código QR
        function generateQRCode(url) {
            const qrCodeImage = document.createElement("img");
            qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
            return qrCodeImage;
        }

        // Función para mostrar el código QR en la interfaz
        function displayQRCode(url) {
            const qrCodeImage = generateQRCode(url);
            const imageContainer = document.createElement("div");
            imageContainer.appendChild(qrCodeImage);
            document.getElementById("chat-log").appendChild(imageContainer);
        }

        // Función para generar y mostrar una imagen
        function generateImage(prompt) {
            const height = 360;
            const width = 480;
            const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=1&height=${height}&width=${width}`;
            const image = document.createElement("img");
            image.src = imageUrl;
            const imageContainer = document.createElement("div");
            imageContainer.appendChild(image);
            document.getElementById("chat-log").appendChild(imageContainer);
        }

        // Función para leer el mensaje en voz alta
        function speakMessage(text) {
            const language = detectLanguage(text);
            const speech = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();

            for (const voice of voices) {
                if (voice.lang === language) {
                    speech.voice = voice;
                    break;
                }
            }

            speech.lang = language;
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;
            window.speechSynthesis.speak(speech);
        }

        // Función para detectar el idioma automáticamente
        function detectLanguage(text) {
            const spanishWords = ['yo', 'tú', 'nosotros', 'buenos', 'hola', 'como', 'estás', 'ser', 'libro', 'hacer'];
            const englishWords = ['you', 'i', 'we', 'hello', 'book', 'to', 'are', 'have'];
            const portugueseWords = ['você', 'eu', 'nós', 'olá', 'livro', 'fazer'];
            const japaneseWords = ['こんにちは', '本', 'あなた', '私', 'です'];
            const koreanWords = ['안녕하세요', '책', '당신', '나', '입니다'];

            const words = text.toLowerCase().split(/\s+/);
            let spanishCount = 0, englishCount = 0, portugueseCount = 0, japaneseCount = 0, koreanCount = 0;

            words.forEach(word => {
                if (spanishWords.includes(word)) spanishCount++;
                if (englishWords.includes(word)) englishCount++;
                if (portugueseWords.includes(word)) portugueseCount++;
                if (japaneseWords.includes(word)) japaneseCount++;
                if (koreanWords.includes(word)) koreanCount++;
            });

            if (spanishCount > englishCount && spanishCount > portugueseCount && spanishCount > japaneseCount && spanishCount > koreanCount) {
                return 'es-ES';
            } else if (englishCount > spanishCount && englishCount > portugueseCount && englishCount > japaneseCount && englishCount > koreanCount) {
                return 'en-US';
            } else if (portugueseCount > spanishCount && portugueseCount > englishCount && portugueseCount > japaneseCount && portugueseCount > koreanCount) {
                return 'pt-PT';
            } else if (japaneseCount > spanishCount && japaneseCount > englishCount && japaneseCount > portugueseCount && japaneseCount > koreanCount) {
                return 'ja-JP';
            } else if (koreanCount > spanishCount && koreanCount > englishCount && koreanCount > portugueseCount && koreanCount > japaneseCount) {
                return 'ko-KR';
            }
            return 'es-ES';
        }
        document.addEventListener('DOMContentLoaded', function () {
                const welcomeMessage = document.getElementById('welcome-message');
                const inputField = document.querySelector('#user-input'); // Cambia esto si tu input tiene otro ID
                if (inputField) {
                    inputField.addEventListener('input', function () {
                        if (inputField.value.trim() !== "") {
                            welcomeMessage.style.transition = 'opacity 0.5s ease';
                            welcomeMessage.style.opacity = '0';
                            setTimeout(() => {
                                welcomeMessage.style.display = 'none';
                            }, 500);
                        }
                    });
                } else {
                    console.warn("No se encontró el input con ID #user-input");
                }
            });
            function loadGame(gameUrl) {
                    const chatLog = document.getElementById("chat-log");
                    if (!chatLog) {
                        console.error("No se encontró el contenedor #chat-log.");
                        return;
                    }

                    const gameWrapper = document.createElement("div");
                    gameWrapper.className = "message-wrapper game";

                    const iframe = document.createElement("iframe");
                    iframe.src = gameUrl;
                    iframe.width = "100%";
                    iframe.style.border = "none";
                    iframe.style.transition = "height 0.3s ease";
                    iframe.allow = "fullscreen";
                    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms"); // seguridad

                    iframe.onload = () => {
                        try {
                            // Pedir altura inicial después de carga
                            iframe.contentWindow.postMessage({ tipo: "solicitarAltura" }, "*");
                        } catch (e) {
                            console.warn("No se pudo solicitar la altura del iframe:", e);
                        }
                    };

                    iframe.setAttribute("data-game", gameUrl);
                    gameWrapper.appendChild(iframe);
                    chatLog.appendChild(gameWrapper);
                    chatLog.scrollTop = chatLog.scrollHeight;
                }

                // Escuchar mensajes del iframe
                window.addEventListener("message", function (event) {
                    if (event.data && event.data.tipo === "ajustarAltura") {
                        const altura = parseInt(event.data.altura);
                        if (!isNaN(altura)) {
                            const iframes = document.querySelectorAll("iframe");
                            for (const iframe of iframes) {
                                try {
                                    if (iframe.contentWindow === event.source) {
                                        iframe.style.height = altura + "px";
                                        break;
                                    }
                                } catch (e) {
                                    console.error("Error al ajustar la altura del iframe:", e);
                                }
                            }
                        }
                    }
                });


/*
// ======================= cuarto codigo y mas funcional =====================================================================//

        // Función para mostrar los mensajes
        function displayMessage(message, sender) {
            const chatLog = document.getElementById("chat-log");
            const messageWrapper = document.createElement("div");
            messageWrapper.classList.add("message-wrapper", sender);
            const messageElement = document.createElement("div");
            messageElement.classList.add("message", sender);
            messageElement.innerText = message;
            messageWrapper.appendChild(messageElement);
            chatLog.appendChild(messageWrapper);
            chatLog.scrollTop = chatLog.scrollHeight;
        }
        // Función para mostrar el mensaje del bot con un efecto de escritura progresiva
        function displayBotMessageProgresivamente(message) {
            const chatLog = document.getElementById("chat-log");
            const messageWrapper = document.createElement("div");
            messageWrapper.classList.add("message-wrapper", "assistant");
            const messageElement = document.createElement("div");
            messageElement.classList.add("message", "assistant");
            messageWrapper.appendChild(messageElement);
            chatLog.appendChild(messageWrapper);
            escribirMensajeProgresivo(message, messageElement);
        }
        // Función para escribir el mensaje de forma progresiva
        function escribirMensajeProgresivo(mensaje, elemento) {
            let index = 0;
            const intervalo = setInterval(() => {
                elemento.innerText = mensaje.slice(0, index);
                index++;
                if (index > mensaje.length) {
                    clearInterval(intervalo);
                }
            }, 50);
        }
        // Lógica del botón de enviar
        document.getElementById("submit-btn").addEventListener("click", () => {
            const userInput = document.getElementById("user-input").value.trim();
            if (!userInput) return;  // No enviar si el input está vacío
            displayMessage(userInput, 'user');
            document.getElementById("user-input").value = "";
            // Evaluamos la entrada del usuario
            let assistantResponse = "";
            if (userInput.toLowerCase().includes("hola")) {
                assistantResponse = "Hola como te encuentras, en que puedo ayudarte en este momento";
            } else if (userInput.toLowerCase().includes("hola como estas")) {
                assistantResponse = "Estoy muy bien gracias por preguntar, ¿y tú? ¿En qué puedo ayudarte?";
            } else if (userInput.toLowerCase().includes("quien es tu creador")) {
                assistantResponse = "Fui creado por Miguel Jose Vila Riascos, un estudiante de ingeniería de sistemas.";
            } else if (userInput.toLowerCase().includes("que puedes hacer")) {
                assistantResponse = "Puedo ayudarte a responder preguntas, jugar juegos y más.";
            } else if (userInput.toLowerCase().includes("como te crearon")) {
                assistantResponse = "Fui creado usando programación y datos para interactuar con personas.";
            } else if (userInput.toLowerCase().includes("quien es miguel vila")) {
                assistantResponse = "Miguel Vila es un programador y estudiante de ingeniería de sistemas.";
            } else if (userInput.toLowerCase().includes("qr") || userInput.toLowerCase().includes("generar código qr")) {
                const url = extractUrl(userInput); // Extraemos la URL si está presente
                if (url) {
                    assistantResponse = "Aquí está el código QR para la URL que mencionaste:";
                    displayQRCode(url);  // Muestra el código QR generado
                } else {
                    assistantResponse = "No pude encontrar una URL válida para generar el código QR. Por favor, ingresa una URL.";
                }
            } else if (userInput.toLowerCase().includes("imagen") || userInput.toLowerCase().includes("generar imagen")) {
                const prompt = extractPrompt(userInput);  // Extraemos el "prompt" para la imagen
                if (prompt) {
                    assistantResponse = "Aquí está la imagen que solicitaste:";
                    generateImage(prompt);  // Generamos y mostramos la imagen
                } else {
                    assistantResponse = "Por favor, proporciona una descripción de la imagen que te gustaría generar.";
                }
            } else {
                assistantResponse = "Lo siento, no entendí tu mensaje. ¿Puedo ayudarte con otra cosa?";
            }
            // Mostramos la respuesta del bot
            displayBotMessageProgresivamente(assistantResponse);
        });
        // Lógica para enviar mensaje con la tecla "Enter"
        document.getElementById("user-input").addEventListener("keydown", function (event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                document.getElementById("submit-btn").click();
            }
        });
    // Función para extraer una URL del mensaje
    function extractUrl(text) {
        const urlPattern = /https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\/\S*)?|\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}\b/g;
        const result = text.match(urlPattern);
        return result ? result[0] : null;
    }

    // Función para extraer el "prompt" de la imagen
    function extractPrompt(text) {
        const promptPattern = /generar imagen de (.+)/i;
        const result = text.match(promptPattern);
        return result ? result[1] : null;
    }

    // Función para generar un código QR
    function generateQRCode(url) {
        const qrCodeImage = document.createElement("img");
        qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
        return qrCodeImage;
    }

    // Función para mostrar el código QR en la interfaz
    function displayQRCode(url) {
        const qrCodeImage = generateQRCode(url);
        const imageContainer = document.createElement("div");
        imageContainer.appendChild(qrCodeImage);
        document.getElementById("chat-log").appendChild(imageContainer);
    }

    // Función para generar y mostrar una imagen
    function generateImage(prompt) {
        const height = 360; // Altura por defecto
        const width = 480;  // Ancho por defecto
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=1&height=${height}&width=${width}`;

        const image = document.createElement("img");
        image.src = imageUrl;

        // Agregar la imagen a la interfaz
        const imageContainer = document.createElement("div");
        imageContainer.appendChild(image);
        document.getElementById("chat-log").appendChild(imageContainer);
    }
    // Función para leer el mensaje en voz alta
    function speakMessage(text) {
        const language = detectLanguage(text); // Detectar el idioma automáticamente
        const speech = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();

        // Seleccionamos la voz adecuada según el idioma detectado
        for (const voice of voices) {
            if (voice.lang === language) {
                speech.voice = voice;
                break;
            }
        }

        speech.lang = language;  // Usar el idioma detectado
        speech.volume = 1;       // Volumen máximo
        speech.rate = 1;         // Velocidad normal
        speech.pitch = 1;        // Tono normal
        window.speechSynthesis.speak(speech);
    }

    // Función para detectar el idioma automáticamente (igual a la anterior)
    function detectLanguage(text) {
        const spanishWords = ['yo', 'tú', 'nosotros', 'buenos', 'hola', 'como', 'estás', 'ser', 'libro', 'hacer'];
        const englishWords = ['you', 'i', 'we', 'hello', 'book', 'to', 'are', 'have'];
        const portugueseWords = ['você', 'eu', 'nós', 'olá', 'livro', 'fazer'];
        const japaneseWords = ['こんにちは', '本', 'あなた', '私', 'です'];
        const koreanWords = ['안녕하세요', '책', '당신', '나', '입니다'];

        const words = text.toLowerCase().split(/\s+/);

        let spanishCount = 0;
        let englishCount = 0;
        let portugueseCount = 0;
        let japaneseCount = 0;
        let koreanCount = 0;

        words.forEach(word => {
            if (spanishWords.includes(word)) spanishCount++;
            if (englishWords.includes(word)) englishCount++;
            if (portugueseWords.includes(word)) portugueseCount++;
            if (japaneseWords.includes(word)) japaneseCount++;
            if (koreanWords.includes(word)) koreanCount++;
        });

        if (spanishCount > englishCount && spanishCount > portugueseCount && spanishCount > japaneseCount && spanishCount > koreanCount) {
            return 'es-ES'; // Español
        } else if (englishCount > spanishCount && englishCount > portugueseCount && englishCount > japaneseCount && englishCount > koreanCount) {
            return 'en-US'; // Inglés
        } else if (portugueseCount > spanishCount && portugueseCount > englishCount && portugueseCount > japaneseCount && portugueseCount > koreanCount) {
            return 'pt-PT'; // Portugués
        } else if (japaneseCount > spanishCount && japaneseCount > englishCount && japaneseCount > portugueseCount && japaneseCount > koreanCount) {
            return 'ja-JP'; // Japonés
        } else if (koreanCount > spanishCount && koreanCount > englishCount && koreanCount > portugueseCount && koreanCount > japaneseCount) {
            return 'ko-KR'; // Coreano
        }

        return 'es-ES';
    }





//====================================== tercer codigo ========================================================================//

/*
document.getElementById("submit-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    // Corregir la entrada del usuario utilizando LanguageTool
    const correctedInput = await correctTextWithLanguageTool(userInput);

    // Mostrar el mensaje del usuario
    displayMessage(userInput, 'user');

    // Limpiar el campo de entrada
    document.getElementById("user-input").value = "";

    // Llamar a la función que obtiene la respuesta del asistente
    const assistantResponse = await getAssistantResponse(correctedInput);

    // Mostrar la respuesta del asistente
    displayMessage(assistantResponse, 'assistant');
});

document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;

    if (!userInput.trim()) {
        return;  // No hacer nada si el input está vacío
    }

    // Agregar la pregunta al chat log
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML += `<div><strong>Tú:</strong> ${userInput}</div>`;

    // Limpiar el input
    document.getElementById('user-input').value = '';

    // Mostrar mensaje de "Cargando..."
    chatLog.innerHTML += `<div><strong>Bot:</strong> Cargando...</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;

    // Llamar a la función que obtiene la respuesta del asistente
    const assistantResponse = await getAssistantResponse(userInput);

    // Mostrar la respuesta del asistente
    chatLog.innerHTML += `<div><strong>Bot:</strong> ${assistantResponse}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
});

// Función para obtener la respuesta del asistente (predefinida o Hugging Face)
async function getAssistantResponse(userInput) {
    // Respuestas predefinidas para preguntas comunes
    const responses = {
        "hola": "Hola, ¿cómo te encuentras? ¿En qué puedo ayudarte?",
        "hola como estas": "Estoy muy bien, gracias por preguntar. ¿Y tú? ¿Cómo estás?",
        "que puedes hacer": "Puedo ayudarte en lo que necesites, escuchar y proporcionarte asistencia según lo que necesites.",
        "como te crearon": "Fui entrenado con datasets y mi código fuente tiene alrededor de 5600 líneas de código.",
        "sabes hacer algo mas": "Sí, puedo responder casi cualquier pregunta que tengas y hablar en más de 65 idiomas."
    };

    // Si la pregunta está en las respuestas predefinidas, devolverla
    if (responses[userInput.toLowerCase()]) {
        return responses[userInput.toLowerCase()];
    }

    // Si la pregunta no está en las respuestas predefinidas, enviar a Hugging Face
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userInput }),
        });

        const data = await response.json();
        return data.answer || "Lo siento, no pude obtener una respuesta del modelo.";
    } catch (error) {
        console.error("Error al consultar Hugging Face:", error);
        return "Hubo un error al intentar obtener una respuesta. Por favor, intenta nuevamente.";
    }
}
// Función para mostrar el mensaje en el chat
function displayMessage(message, sender) {
    const chatLog = document.getElementById("chat-log");

    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message-wrapper", sender);
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerText = message;

    messageWrapper.appendChild(messageElement);
    chatLog.appendChild(messageWrapper);

    // Desplazar el chat hacia abajo
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Función para corregir el texto usando LanguageTool API
async function correctTextWithLanguageTool(userInput) {
    const apiUrl = 'https://api.languagetool.org/v2/check';
    const params = new URLSearchParams();
    params.append('text', userInput);
    params.append('language', 'es'); // Usamos español
    params.append('enabledOnly', 'false'); // Para obtener todas las correcciones posibles

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });

        const data = await response.json();

        // Aplicamos las correcciones al texto
        let correctedText = userInput;
        if (data.matches) {
            // Reemplazar los errores encontrados por las sugerencias
            for (let match of data.matches) {
                const errorText = match.context.text.slice(match.context.offset, match.context.offset + match.context.length);
                const replacement = match.replacements.length > 0 ? match.replacements[0].value : '';
                correctedText = correctedText.replace(errorText, replacement);
            }
        }
        return correctedText;
    } catch (error) {
        console.error('Error en la corrección con LanguageTool:', error);
        alert('Hubo un problema al corregir el texto. Intentando enviar el texto sin corrección.');
        return userInput;  // Si hay un error, devolvemos el texto sin cambios
    }
}


// Función para simular la escritura progresiva
function escribirMensajeProgresivo(mensaje, elemento) {
    let index = 0;
    const intervalo = setInterval(() => {
        elemento.innerText = mensaje.slice(0, index);
        index++;

        if (index > mensaje.length) {
            clearInterval(intervalo); // Detener la animación cuando todo el texto ha sido mostrado
        }
    }, 50); // El valor de 50ms controla la velocidad de la "escritura"
}

// Simular respuesta del bot
const mensajeBot = "Hola, soy el bot y te ayudaré.";
const contenedorMensajeBot = document.createElement('div');
contenedorMensajeBot.classList.add('message', 'bot'); // Añadir clases para estilo
document.querySelector('.chat-log').appendChild(contenedorMensajeBot);

// Llamar a la función para escribir el mensaje progresivamente
escribirMensajeProgresivo(mensajeBot, contenedorMensajeBot);


*/

// =============================== segundo codigo ====================================================//

/*
// Función que escucha el evento de click en el botón de envío
 document.getElementById("submit-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    // Corregir la entrada del usuario utilizando LanguageTool
    const correctedInput = await correctTextWithLanguageTool(userInput);

    // Mostrar el mensaje del usuario
    displayMessage(userInput, 'user');

    // Limpiar el campo de entrada
    document.getElementById("user-input").value = "";

    // Llamar a la función que obtiene la respuesta del asistente
    const assistantResponse = await getAssistantResponse(correctedInput);

    // Mostrar la respuesta del asistente
    displayMessage(assistantResponse, 'assistant');
 });
 document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    
    if (!userInput.trim()) {
        return;  // No hacer nada si el input está vacío
    }

    // Agregar la pregunta al chat log
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML += `<div><strong>Tú:</strong> ${userInput}</div>`;

    // Limpiar el input
    document.getElementById('user-input').value = '';

    // Mostrar mensaje de "Cargando..."
    chatLog.innerHTML += `<div><strong>Bot:</strong> Cargando...</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;

    // Enviar la pregunta al servidor
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: userInput })
        });

        const result = await response.json();
        if (result.answer) {
            // Mostrar la respuesta del bot
            chatLog.innerHTML += `<div><strong>Bot:</strong> ${result.answer}</div>`;
        } else {
            chatLog.innerHTML += `<div><strong>Bot:</strong> No pude entender la pregunta.</div>`;
        }

        chatLog.scrollTop = chatLog.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        chatLog.innerHTML += `<div><strong>Bot:</strong> Hubo un error al procesar tu pregunta.</div>`;
    }
});

// Función para capturar enter en el input
document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        document.getElementById("submit-btn").click();
    } else if (event.key === "Enter" && event.shiftKey) {
        // Permitir salto de línea
        document.getElementById("user-input").value += "\n";
    }
});

// Función para mostrar el mensaje en el chat
function displayMessage(message, sender) {
    const chatLog = document.getElementById("chat-log");

    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message-wrapper", sender);
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerText = message;

    messageWrapper.appendChild(messageElement);
    chatLog.appendChild(messageWrapper);

    // Desplazar el chat hacia abajo
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Función para corregir el texto usando LanguageTool API
async function correctTextWithLanguageTool(userInput) {
    const apiUrl = 'https://api.languagetool.org/v2/check';
    const params = new URLSearchParams();
    params.append('text', userInput);
    params.append('language', 'es'); // Usamos español
    params.append('enabledOnly', 'false'); // Para obtener todas las correcciones posibles

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });

        const data = await response.json();

        // Aplicamos las correcciones al texto
        let correctedText = userInput;
        if (data.matches) {
            // Reemplazar los errores encontrados por las sugerencias
            for (let match of data.matches) {
                const errorText = match.context.text.slice(match.context.offset, match.context.offset + match.context.length);
                const replacement = match.replacements.length > 0 ? match.replacements[0].value : '';
                correctedText = correctedText.replace(errorText, replacement);
            }
        }
        return correctedText;
    } catch (error) {
        console.error('Error en la corrección con LanguageTool:', error);
        alert('Hubo un problema al corregir el texto. Intentando enviar el texto sin corrección.');
        return userInput;  // Si hay un error, devolvemos el texto sin cambios
    }
}

// Función para obtener la respuesta del asistente (predefinida o búsqueda en la web)
async function getAssistantResponse(userInput) {
    // Respuestas predefinidas para preguntas comunes
    const responses = {
        "hola": "Hola como te encuentras, en que puedo ayudarte en este momento",
        "hola como estas": " Estoy muy bien gracias por preguntar y como te encuentras, en que puedo ayudarte en este momento",
        "que puedes hacer": "Puedo ayudarte en lo que necesites, escuchar y proporcionarte asistencia según lo que necesites.",
        "como te crearon": "Fui entrenado con datasets y mi código fuente tiene alrededor de 5600 líneas de código.",
        "sabes hacer algo mas": "Sí, puedo responder casi cualquier pregunta que tengas y hablar en más de 65 idiomas.",
       }

    // Si la pregunta está en las respuestas predefinidas, devolverla
    if (responses[userInput.toLowerCase()]) {
        return responses[userInput.toLowerCase()];
    }

    // Si la pregunta no está en las respuestas predefinidas, buscar en la web
    return await searchWeb(userInput);
}

// Función para hacer una búsqueda en la web utilizando la API de Searx (OSINT)
async function searchWeb(query) {
    const url = `https://searx.org/search?q=${encodeURIComponent(query)}&categories=general&format=json`;

    try {
        // Realizar la petición GET a la API de Searx
        const response = await fetch(url);
        const data = await response.json();

        // Si se encuentra una respuesta
        if (data && data.results && data.results.length > 0) {
            const firstResult = data.results[0];

            // Filtrar solo los primeros resultados relevantes
            const answer = `Según mi búsqueda en la web, encontré esta información:\n\n${firstResult.title}\n${firstResult.url}`;
            return answer;
        } else {
            // Si no se encuentran resultados
            return "Lo siento, no pude encontrar una respuesta precisa en la web.";
        }
    } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
        return "Hubo un error al intentar buscar en la web. Intenta nuevamente.";
    }
}

function loadGame(gameUrl) {
    const chatLog = document.getElementById("chat-log");
    const gameWrapper = document.createElement("div");
    gameWrapper.className = "message-wrapper game";

    const iframe = document.createElement("iframe");
    iframe.src = gameUrl;
    iframe.width = "80%";
    iframe.style.border = "none";
    iframe.style.transition = "height 0.3s ease"; // animación suave
    iframe.onload = () => {
        // Por si acaso, forzar primer ajuste en load
        iframe.contentWindow.postMessage({ tipo: "solicitarAltura" }, "*");
    };

    // Guardar una referencia por si hay varios iframes
    iframe.setAttribute("data-game", gameUrl);

    gameWrapper.appendChild(iframe);
    chatLog.appendChild(gameWrapper);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Escuchar los mensajes de los iframes
window.addEventListener("message", function (event) {
    if (event.data && event.data.tipo === "ajustarAltura") {
        // Buscar el iframe que envió el mensaje
        const iframes = document.querySelectorAll("iframe");
        for (const iframe of iframes) {
            try {
                if (iframe.contentWindow === event.source) {
                    iframe.style.height = event.data.altura + "px";
                    break;
                }
            } catch (e) {
                // Previene errores de cross-origin si los hubiera
                console.error("No se pudo ajustar altura:", e);
            }
        }
    }
});

*/



//============================= primer codigo =============================//

/*document.getElementById("submit-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    // Convertir la entrada a minúsculas y corregir errores ortográficos
    const correctedInput = exactlyRequest(userInput);

    // Mostrar el mensaje del usuario
    displayMessage(userInput, 'user');

    // Limpiar el campo de entrada
    document.getElementById("user-input").value = "";

    // Llamar a la función que obtiene la respuesta del asistente
    const assistantResponse = await getAssistantResponse(correctedInput);

    // Mostrar la respuesta del asistente
    displayMessage(assistantResponse, 'assistant');
});

// Captura de teclas en el input (Enter para enviar, Shift+Enter para salto de línea)
document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        document.getElementById("submit-btn").click();
    } else if (event.key === "Enter" && event.shiftKey) {
        // Permitir salto de línea
        document.getElementById("user-input").value += "\n";
    }
});

function displayMessage(message, sender) {
    const chatLog = document.getElementById("chat-log");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerText = message;

    chatLog.appendChild(messageElement);

    // Desplazar el chat hacia abajo
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Función de corrección de texto (exactlyRequest)
function exactlyRequest(userInput) {
    const corrections = {
        "quiwn": "quien",
        "eres?": "eres?",
        "donal trump": "donald trump",
        "que pueod hacer": "que puedo hacer",
        "como te crearon": "como te crearon",
        "quien es el presidente de usa": "quien es el presidente de usa",
        "donde esta la torre eiffel": "donde esta la torre eiffel",
        "que es la inteligencia artificial": "que es la inteligencia artificial",
        "como estas": "como estas"
    };

    // Convertir la entrada a minúsculas
    const lowerInput = userInput.toLowerCase();

    // Buscar en el diccionario de correcciones
    for (let key in corrections) {
        if (lowerInput.includes(key)) {
            return lowerInput.replace(key, corrections[key]);
        }
    }

    // Si no hay correcciones, retornar la entrada original
    return userInput;
}

// Función para obtener la respuesta del asistente (predefinida o búsqueda en la web)
async function getAssistantResponse(userInput) {
    // Respuestas predefinidas para preguntas comunes
    const responses = {
        "quien es tu creador": "Fui creado por un estudiante universitario.",
        "para que fuiste creado": "Fui creado para ayudar a los humanos en su trabajo, emociones y conocimiento.",
        "que puedes hacer": "Puedo ayudarte en lo que necesites, escuchar y proporcionarte asistencia según lo que necesites.",
        "como te crearon": "Fui entrenado con datasets y mi código fuente tiene alrededor de 5600 líneas de código.",
        "sabes hacer algo mas": "Sí, puedo responder casi cualquier pregunta que tengas y hablar en más de 65 idiomas.",
        "quien eres": "Soy un asistente AI creado para ayudarte en lo que necesites."
    };

    // Si la pregunta está en las respuestas predefinidas, devolverla
    if (responses[userInput]) {
        return responses[userInput];
    }

    // Si la pregunta no está en las respuestas predefinidas, buscar en la web
    return await searchWeb(userInput);
}

// Función para hacer una búsqueda en la web utilizando la API de Searx (OSINT)
async function searchWeb(query) {
    const url = `https://searx.org/search?q=${encodeURIComponent(query)}&categories=general&format=json`;

    try {
        // Realizar la petición GET a la API de Searx
        const response = await fetch(url);
        const data = await response.json();

        // Si se encuentra una respuesta
        if (data && data.results && data.results.length > 0) {
            const firstResult = data.results[0];

            // Filtrar solo los primeros resultados relevantes
            const answer = `Según mi búsqueda en la web, encontré esta información:\n\n${firstResult.title}\n${firstResult.url}`;
            return answer;
        } else {
            // Si no se encuentran resultados
            return "Lo siento, no pude encontrar una respuesta precisa en la web.";
        }
    } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
        return "Hubo un error al intentar buscar en la web. Intenta nuevamente.";
    }
}
*/