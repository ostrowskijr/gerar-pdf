const pdf = require('html-pdf');
const nodemailer = require('nodemailer');
const path = require('path');
const filePath = path.join('./public/download/', 'report.pdf');
const passengers = [
    {
        "name": "Luis Ostrowski",
        "flightNumber": 7589,
        "time": "14h00"
    },
    {
        "name": "Isadora Ostrowski",
        "flightNumber": 7569,
        "time": "18h00"
    },
    {
        "name": "JOão da Silva",
        "flightNumber": 4500,
        "time": "21h00"
    },
    {
        "name": "Pedro Silva",
        "flightNumber": 2652,
        "time": "13h30"
    },
    {
        "name": "Celio Ostrowski",
        "flightNumber": 2511,
        "time": "23h00"
    },
    {
        "name": "Andre Batista",
        "flightNumber": 2455,
        "time": "21h30"
    },
];

const index = (req, res) => {
    res.render('print', { passengers }, (err, html) => {
        if (err) {
            return res.send('Erro na leitura do Arquivo! ' + err);
        }
        const options = {
            height: "11.25in",
            width: "8.5in",
            header: {
                height: "20mm"
            },
            footer: {
                height: "20mm"
            }
        }
        //
        pdf.create(html, options).toFile(filePath, (err, data) => {
            if (err) {
                return res.send('Erro na leitura do Arquivo... ' + err);
            }
        });
        // Enviar para o navegador.
        return res.send(html);
    });
};

const download = (req, res) => {
    return res.download(filePath, 'ReportPassengers.pdf', (err, data) => {
        if (err) {
            return res.send(`Erro ao realizar download do arquivo: ${filePath} - Erro: ${err}`);
        }
    });
};

const email = (req, res) => {
    res.render('email');
};

const sendmail = (req, res) => {
    const { email, nome } = req.body;
    //
    let transportOptions = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL,
            pass: process.env.SENHA
        },
        tls: { rejectUnauthorized: true }

    };
    const transport = nodemailer.createTransport(transportOptions);
    let mailoptions = {
        to: email,
        from: 'ostrowskijr@gmail.com',
        subject: 'Envio E-mail aplicação NodeJs',
        text: `Teste rotina de envio de e-mail Node Js, usuário: ${nome}`,
        attachments : [{
            filename: 'report.pdf',
            path: filePath
        }]
    };
    transport.sendMail(mailoptions, (err, info) => {
        if (err){
            return res.send(`Ocorreu um erro ao enviar o E-mail: ${err}`)
        }
        return res.send(`Envio realizado. ${info.response}`);
    })
    
};

module.exports = {
    index, download, email, sendmail
}