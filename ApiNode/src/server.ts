import express, { request, response } from 'express';

const app = express();

/**
 * Get => Buscar
 * Post => Salvar
 * Put => Alterar
 * Delete => Deletar
 * Patch => Alteração especifica
 */

// 1º param => Rota(recurso API)
// 2º param => request,response

app.get("/", (request, response) => {
    return response.json({ message: "Hello world - NLW04" });
});

app.post("/", (request, response) => {
    // retornou os dados para salvar
    return response.json({ message: "Os dados foram salvos com sucesso!" });
});

app.listen(3333, () => console.log("Server is runing!"));
