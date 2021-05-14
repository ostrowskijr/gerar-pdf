const pdf = require('html-pdf');
const nodemailer = require('nodemailer');
const path = require('path');
const filePath = path.join('./public/download/', 'report.pdf');
const contacts = [
    {
        "name": "João da Silva",
        "email": "joao@gmail.com",
        "fone": "(44) 94564-1234"
    },
    {
        "name": "Pedro Oliveira",
        "email": "pedro@yahoo.com.br",
        "fone": "(43) 94466-1244"
    },
    {
        "name": "Velozo",
        "email": "vs@bol.com.br",
        "fone": "(11) 12345-4567"
    },
    {
        "name": "Pedro Silva",
        "email": "silva@apple.com",
        "fone": "(15) 4565-1234"
    },
    {
        "name": "Celio de Jesus",
        "email": "cj@teste.net",
        "fone": "(11) 64568-1234"
    },
    {
        "name": "Andre Mourão",
        "email": "andre@hotmail.com",
        "fone": "(44) 3589-2424"
    },
];

const index = (req, res) => {
    res.render('print', { contacts }, (err, html) => {
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
    return res.download(filePath, 'Contacts.pdf', (err, data) => {
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
        from: process.env.EMAIL,
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