const express = require('express');

const app = express();
app.use(express.json());

const listaDeConvidados = ["Carlos", "Amanda", "Fernanda", "Juliana", "Lucas", "Roberto"];

app.get('/convidados', (req, res) => {
    const nomeDoConvidado = req.query.nome;
    if (nomeDoConvidado) {
        console.log(`Consultar na lista ${nomeDoConvidado} `)
        const convidado = listaDeConvidados.find((convidado) => convidado === (nomeDoConvidado));
        if (convidado) {
            res.json({
                "mensagem": "Convidado presente."
            });
        } else {
            res.json({ "mensagem": "O convidado buscado não está presente na lista." });
        }
    } else {
        console.log('Solicitado acesso a lista de convidados');
        res.send(listaDeConvidados);
    }
});

app.post('/convidados', (req, res) => {
    const nomeDoConvidado = req.body.nome;
    const convidado = listaDeConvidados.find((convidado) => convidado === (nomeDoConvidado));
    if (convidado) {
        res.json({
            "mensagem": "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também."
        });
    } else {
        listaDeConvidados.push(nomeDoConvidado);
        res.json({
            "mensagem": "Convidado adicionado."
        });
    }
    console.log(req.body);
});

app.delete('/convidados/:nome', (req, res) => {
    const nomeDoConvidado = req.params.nome;
    const convidado = listaDeConvidados.indexOf(nomeDoConvidado);
    if (convidado !== -1) {
        listaDeConvidados.splice(convidado, 1);
        res.json({
            "mensagem": "Convidado removido."
        });
    } else {
        res.json({
            "mensagem": "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido."
        });
    }
});

app.listen(8000);