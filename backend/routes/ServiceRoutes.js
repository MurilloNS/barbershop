const router = require("express").Router();
const ServiceController = require("../controllers/ServiceController");
const jwtAuthMiddleware = require("../middlewares/jwtAuthMiddleware");

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Operações relacionadas a serviços
 */

/**
 * @swagger
 * /services/create:
 *   post:
 *     summary: Criar um novo serviço
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do serviço.
 *                 example: Corte de cabelo
 *               price:
 *                 type: number
 *                 description: Preço do serviço.
 *                 example: 50
 *               duration:
 *                 type: string
 *                 description: Duração do serviço no formato "hh:mm".
 *                 example: "00:30"
 *               description:
 *                 type: string
 *                 description: Descrição do serviço.
 *                 example: Corte de cabelo simples.
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Serviço criado com sucesso!"
 *       400:
 *         description: Solicitação malformada (campos obrigatórios ausentes ou inválidos).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: "Bad Request"
 *                 message:
 *                   type: string
 *                   example: "Nome, preço e duração são obrigatórios"
 *       403:
 *         description: Proibido (somente barbeiros podem criar serviços).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 error:
 *                   type: string
 *                   example: "Forbidden"
 *                 message:
 *                   type: string
 *                   example: "Somente barbeiros podem criar novos serviços."
 *       401:
 *         description: Não autorizado (token não fornecido ou inválido).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Token não fornecido!"
 *       409:
 *         description: Conflito (serviço já cadastrado com o mesmo nome).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 409
 *                 error:
 *                   type: string
 *                   example: "Conflict"
 *                 message:
 *                   type: string
 *                   example: "Serviço já cadastrado!"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "Erro ao criar serviço!"
 */

router.post("/create", jwtAuthMiddleware, ServiceController.create);

module.exports = router;
