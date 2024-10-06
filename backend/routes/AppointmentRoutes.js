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
 *
 * /appointments/barber/{barberId}:
 *   get:
 *     summary: Listar agendamentos de um barbeiro
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do barbeiro
 *     responses:
 *       200:
 *         description: Lista de agendamentos do barbeiro.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   barberId:
 *                     type: string
 *                     description: ID do barbeiro.
 *                   userId:
 *                     type: string
 *                     description: ID do cliente.
 *                   serviceId:
 *                     type: string
 *                     description: ID do serviço.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Data do agendamento.
 *                   status:
 *                     type: string
 *                     enum: ["scheduled", "closed", "canceled"]
 *                     description: Status do agendamento.
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
 *                   example: Unauthorized
 *                 message:
 *                   type: string
 *                   example: "Token não fornecido!"
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
 *                   example: Internal Server Error
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar agendamentos!"
 *
 * /appointments/{id}:
 *   get:
 *     summary: Buscar um agendamento pelo ID
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do agendamento a ser buscado.
 *     responses:
 *       200:
 *         description: Agendamento encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Agendamento encontrado com sucesso!"
 *                 appointment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     barberId:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     userId:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     serviceId:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         price:
 *                           type: number
 *                         duration:
 *                           type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *                     status:
 *                       type: string
 *                       enum: ["scheduled", "closed", "canceled"]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Agendamento não encontrado.
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
 *                   example: Not Found
 *                 message:
 *                   type: string
 *                   example: "Agendamento não encontrado!"
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
 *                   example: Internal Server Error
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar o agendamento!"
 *
 * /appointments/{appointmentId}:
 *   patch:
 *     summary: Atualizar status ou outros atributos de um agendamento
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do agendamento a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Novo status do agendamento (scheduled, closed, canceled)
 *                 example: "closed"
 *               date:
 *                 type: string
 *                 description: Nova data do agendamento
 *                 example: "2024-10-15T14:00:00.000Z"
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Agendamento atualizado com sucesso!"
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Solicitação malformada.
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
 *                   example: Bad Request
 *                 message:
 *                   type: string
 *                   example: "Dados inválidos."
 *       404:
 *         description: Agendamento não encontrado.
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
 *                   example: Not Found
 *                 message:
 *                   type: string
 *                   example: "Agendamento não encontrado!"
 *       500:
 *         description: Erro no servidor.
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
 *                   example: Internal Server Error
 *                 message:
 *                   type: string
 *                   example: "Erro ao atualizar o agendamento!"
 */

router.get(
  "/barber/:barberId",
  jwtAuthMiddleware,
  AppointmentController.listAppointmentsByBarber
);
router.get("/:appointmentId", jwtAuthMiddleware, AppointmentController.getById);
router.post("/schedule", jwtAuthMiddleware, AppointmentController.schedule);
router.patch(
  "/:appointmentId",
  jwtAuthMiddleware,
  AppointmentController.update
);

module.exports = router;
