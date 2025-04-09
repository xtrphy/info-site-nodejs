const http = require('http');
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact-me', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact-me.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// const server = http.createServer((req, res) => {
//     const url = req.url;

//     if (url === '/' || url === '/home') {
//         serveFile(res, 'index.html', 'text/html');
//     } else if (url === '/about') {
//         serveFile(res, 'about.html', 'text/html');
//     } else if (url === '/contact-me', 'text/html') {
//         serveFile(res, 'contact-me.html', 'text/html');
//     } else {
//         serveFile(res, '404.html', 'text/html', 404);
//     }
// });

function serveFile(res, filename, contentType, statusCode = 200) {
    const filePath = path.join(__dirname, filename);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Server error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});
