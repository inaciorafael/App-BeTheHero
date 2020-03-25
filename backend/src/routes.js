const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router()


/**
 * Rota /Recurso
 */

/**
 * Método HTTP
 * 
 * GET: Buscar/Listar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar um informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de Parametros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota, após o "?" (Filtros, páginação)
 * Route Params: Parâmetros usados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)

routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes;