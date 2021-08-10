const http = require('http');
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder;
const hostname = '127.0.0.1';
const port = 5000;


const cbServer = (req, res) => {
    const reqUrl = req.url
    const parsedUrl = url.parse(reqUrl, true)
    const path = parsedUrl.pathname
    const cleanPath = path.replace(/^\/+|\/+$/g, '')
    const query = parsedUrl.query
    const method = req.method.toUpperCase()
    const header = req.headers
    const decoder = new StringDecoder('utf-8')
    let buffer = ''

    // Streams events
    req.on('data', (data) => {
        buffer += decoder.write(data)
    })
    req.on('end', () => {
        buffer += decoder.end()
    })

    // Path checkers
    if (cleanPath === 'demo'){
        res.end('Estas en demo')
    } else {
        res.end('Hola MundoX');
    }
}


const server = http.createServer(cbServer);

server.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});