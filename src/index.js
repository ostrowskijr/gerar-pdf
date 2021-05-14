const express = require('express');
const path = require('path');
const router = require('./routes');
const server = express();
const PORT = process.env.PORT || 3000;

//Setar view engine para o projeto
server.set('view engine', 'ejs');
//Setar o diretório das views do projetos
server.set('views', path.join(__dirname, 'pages'));
//Setar rotas de acesso a aplicação
server.use('/', router);
//Start servidor
server.listen(PORT, (error) => {
    if (!error) {
        console.log(`Servidor iniciado com sucesso na porta: ` + PORT);
    } else {
        console.log(`Erro ao iniciar servidor Node: ` + error);
    }
});