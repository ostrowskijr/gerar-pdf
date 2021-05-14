const express = require('express');
const pdf = require('html-pdf')
const path = require('path');
const server = express();
const PORT = process.env.PORT || 3000;
const filePath = './public/download/report.pdf';

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'pages'));

const passengers = [
    {
        "name" : "Luis Ostrowski",
        "flightNumber" : 7589,
        "time" : "14h00"
    },
    {
        "name" : "Isadora Ostrowski",
        "flightNumber" : 7569,
        "time" : "18h00"
    },
    {
        "name" : "JOão da Silva",
        "flightNumber" : 4500,
        "time" : "21h00"
    },
    {
        "name" : "Pedro Silva",
        "flightNumber" : 2652,
        "time" : "13h30"
    },
    {
        "name" : "Celio Ostrowski",
        "flightNumber" : 2511,
        "time" : "23h00"
    },
];

server.get('/', (req, res) => {    
    res.render('print', { passengers }, (err, html) => {
        if (err){
            return res.send('Erro na leitura do Arquivo! ' + err);
        }
        const options = {
            height : "11.25in",
            width : "8.5in",
            header : {
                height : "20mm"
            },
            footer : {
                height : "20mm"
            }            
        }
        //
        pdf.create(html, options).toFile(filePath, (err, data) => {
            if (err) {
                return res.send('Erro na leitura do Arquivo! ' + err);
            }
        });        
        // Enviar para o navegador.
        return res.send(html);
    });
});

server.get('/download', (req, res, next) => {
    return res.download(filePath, 'ReportPassengers.pdf', (err, data) => {
        if (err){
            return res.send(`Erro ao realizar download do arquivo: ${filePath} - Erro: ${err}`);
        }
    });
})

server.listen(PORT, (error) => {
    if (!error) {
        console.log(`Servidor iniciado com sucesso na porta: ` + PORT);
    } else {
        console.log(`Erro ao iniciar servidor Node: ` + error);
    }
});