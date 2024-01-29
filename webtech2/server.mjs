
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const server = createServer(async (req, res) => {
  try {
    let filePath = './fruits.html';

    // Get the directory name of the current module
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = new URL('.', __filename).pathname;

    if (req.url === '/fruits') {
      filePath = './fruits.html';
    }

    const fileContent = await readFile(`${__dirname}/${filePath}`, 'utf8');

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(fileContent);
    res.end();
  } catch (error) {
    console.error('Error handling request:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.write('Internal Server Error');
    res.end();
  }
});

const PORT = 3000;
const HOST = 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});