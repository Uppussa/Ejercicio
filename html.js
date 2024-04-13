const http = require('http');

const handler = (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Welcome</title>
      </head>
      <body>
        <h1>Welcome to Your Node.js Application!</h1>
      </body>
    </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
};

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});