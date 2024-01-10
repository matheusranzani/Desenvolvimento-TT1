const http = require('http');
const fs = require('fs');

let resTemplate;

function loadTemplate(callback) {
    fs.readFile('./template.xml', function (err, content) {
        if (err) {
            callback(err);
        } else {
            resTemplate = content;
            callback(null);
        }
    });
}

const server = http.createServer();

server.on('request', function (req, res) {
    console.log('request chegou');
    // Simulação de função para obter parâmetros da requisição
    const params = { data: 'teste' };

    // Simulação de função para renderizar o template
    const renderedTemplate = renderTemplate(resTemplate, params);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(renderedTemplate);
});

server.listen(5001, function () {
    loadTemplate(function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Servidor iniciado na porta 5001');
            // Encerrar o servidor após 10 segundos
            setTimeout(function () {
                console.log('Servidor encerrado');
                server.close();
            }, 5000); // 10 segundos
        }
    });
});

setTimeout(() => {
    const resposta = http.get('http://localhost:5001');
    // resposta.on('response', resposta => console.log(resposta));
}, 1000);

// Função simulada de renderização do template
function renderTemplate(template, params) {
    return `Template renderizado com: ${JSON.stringify(params)}`;
}
