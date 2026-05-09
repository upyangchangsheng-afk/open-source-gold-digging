const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'out');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0].split('#')[0];

  // Default to index.html
  if (url === '/') url = '/index.html';

  // Clean URL -> .html
  if (!path.extname(url)) url += '.html';

  const filePath = path.join(OUT, url);

  // Security: prevent directory traversal
  if (!filePath.startsWith(OUT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try 404 page
      fs.readFile(path.join(OUT, '404.html'), (e2, d2) => {
        if (d2) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(d2);
        } else {
          res.writeHead(404);
          res.end('404 Not Found');
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}).listen(8080, () => {
  console.log('Server running at http://localhost:8080');
});
