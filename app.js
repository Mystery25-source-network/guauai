const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Servir archivos estáticos desde la carpeta 'public'
// Express buscará automáticamente el 'index.html' cuando se acceda a la raíz.
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});


/*
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para servir el index.html en la raíz (asegurándose de la ubicación correcta)
app.get('/', (req, res) => {
    // Cambia la ruta a la correcta según la ubicación de tu index.html
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Asegúrate de que el index.html esté aquí
});

// Ruta para manejar la interacción con Hugging Face
app.post('/chat', async (req, res) => {
    const { query } = req.body;

    // Verificar que la consulta esté presente
    if (!query) {
        return res.status(400).json({ error: 'No se proporcionó la consulta' });
    }

    // URL de la API de Hugging Face
    const url = 'https://api-inference.huggingface.co/models/gpt2'; 
    const headers = {
        'Authorization': `Bearer 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`,  // Usa tu API Key de Hugging Face
        'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
        inputs: query,
        parameters: { max_length: 50 }
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        const data = await response.json();

        if (data && data[0]) {
            res.json({ answer: data[0].generated_text });
        } else {
            res.status(500).json({ error: 'No se pudo generar una respuesta.' });
        }
    } catch (error) {
        console.error('Error al interactuar con Hugging Face:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
*/