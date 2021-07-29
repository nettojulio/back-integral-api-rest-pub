const express = require('express');
const livros = require('./dados/livros')

const app = express();
app.use(express.json());

app.get('/livros', (req, res) => {
    res.json(livros);
});

app.get('/:params', (req, res) => {
    let idLivro = Number(req.params.params);
    const livro = livros.find((livro) => livro.id === idLivro);

    if (livro) {
        res.json(livro)
    } else if (!livro && idLivro || idLivro === 0) {
        res.json({
            "mensagem": "Não existe livro para o ID informado."
        });
    } else if (!idLivro) {
        res.json({
            "mensagem": "O valor do parâmetro ID da URL não é um número válido."
        });
    }
});

app.post('/livros', (req, res) => {
    console.log(req.body)
    // FAZER PARA ARRAYS DEPOIS

    let proxId = (livros.length + 1);
    let addLivro = {
        id: proxId,
        titulo: req.body.titulo,
        autor: req.body.autor,
        ano: req.body.ano,
        numPaginas: req.body.numPaginas
    }
    livros.push(addLivro);
    res.json(addLivro);
});

app.put('/livros/:id', (req, res) => {
    console.log(req.body);
    let idLivro = Number(req.params.id);
    const livro = livros.find((livro) => livro.id === idLivro);

    if (livro) {
        livro.titulo = req.body.titulo;
        livro.autor = req.body.autor;
        livro.ano = req.body.ano;
        livro.numPaginas = req.body.numPaginas;
        res.json({
            "mensagem": "Livro substituído."
        })
    } else {
        res.json({
            "mensagem": "Não existe livro a ser substituído para o ID informado."
        });
    }
});

app.patch('/livros/:id', (req, res) => {
    console.log(req.body);
    let idLivro = Number(req.params.id);
    const livro = livros.find((livro) => livro.id === idLivro);

    if (livro) {
        if (req.body.titulo !== undefined) {
            livro.titulo = req.body.titulo;
        }
        if (req.body.autor !== undefined) {
            livro.autor = req.body.autor;
        }
        if (req.body.ano !== undefined) {
            livro.ano = req.body.ano;
        }
        if (req.body.numPaginas !== undefined) {
            livro.numPaginas = req.body.numPaginas;
        }

        res.send({
            "mensagem": "Livro alterado."
        });
    } else {
        res.json({
            "mensagem": "Não existe livro a ser alterado para o ID informado."
        });
    }
});

app.delete('/livros/:id', (req, res) => {
    let idLivro = Number(req.params.id);
    const livro = livros.find((livro) => livro.id === idLivro);

    if (livro) {
        const indice = livros.indexOf(livro);
        livros.splice(indice, 1);
        res.json({
            "mensagem": "Livro removido."
        });
    } else if (!livro || idLivro){
        res.json({
            "mensagem": "Não existe livro a ser removido para o ID informado."
          });
    }
});

app.listen(8000);