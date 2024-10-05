const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/AppointmentController");
const jwtAuthMiddleware = require("../middlewares/jwtAuthMiddleware"); // Middleware para verificar JWT

/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: Operações relacionadas a agendamentos
 */

/**
 * @swagger
 * /appointments/schedule:
 *   post:
 *     summary: "Criar Agendamento"
 *     description: "Cria um novo agendamento para um cliente com um barbeiro e um serviço especificados."
 *     tags:
 *       - Agendamentos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               barberId:
 *                 type: string
 *                 description: "ID do barbeiro que realizará o serviço."
 *                 example: "60e8b0f5f2b7f5e1f8c8f7a3"
 *               userId:
 *                 type: string
 *                 description: "ID do cliente que agendará o serviço."
 *                 example: "60e8b0f5f2b7f5e1f8c8f7a4"
 *               serviceId:
 *                 type: string
 *                 description: "ID do serviço a ser agendado."
 *                 example: "60e8b0f5f2b7f5e1f8c8f7a5"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: "Data e hora do agendamento no formato ISO 8601."
 *                 example: "2024-10-10T14:00:00Z"
 *     responses:
 *       '201':
 *         description: "Agendamento criado com sucesso!"
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
 *                   example: "Agendamento criado com sucesso!"
 *                 appointment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60e8b0f5f2b7f5e1f8c8f7a6"
 *                     barberId:
 *                       type: string
 *                       example: "60e8b0f5f2b7f5e1f8c8f7a3"
 *                     userId:
 *                       type: string
 *                       example: "60e8b0f5f2b7f5e1f8c8f7a4"
 *                     serviceId:
 *                       type: string
 *                       example: "60e8b0f5f2b7f5e1f8c8f7a5"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-10T14:00:00Z"
 *                     status:
 *                      type: string
 *                      example: "scheduled"
 *       '400':
 *         description: "Requisição mal formada. Um ou mais campos obrigatórios não foram fornecidos."
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
 *                   example: "Todos os campos são obrigatórios!"
 *       '404':
 *         description: "Barbeiro ou serviço não encontrado."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 error:
 *                   type: string
 *                   example: "Not Found"
 *                 message:
 *                   type: string
 *                   example: "Barbeiro não encontrado!"
 *       '409':
 *         description: "Conflito de agendamento, barbeiro não disponível nesse horário."
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
 *                   example: "Barbeiro não disponível nesse horário!"
 *       '500':
 *         description: "Erro interno ao criar agendamento."
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
 *                   example: "Erro ao criar agendamento!"
 */


router.post("/schedule", jwtAuthMiddleware, AppointmentController.schedule);

module.exports = router;
