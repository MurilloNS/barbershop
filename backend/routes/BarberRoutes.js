// routes/BarberRoutes.js
const router = require('express').Router();
const BarberController = require('../controllers/BarberController');

/**
 * @swagger
 * tags:
 *   - name: "Barbeiros"
 *     description: "Operações relacionadas a barbeiros"
 * 
 * /barbers/register:
 *   post:
 *     tags:
 *       - "Barbeiros"
 *     summary: "Registrar um novo barbeiro"
 *     description: "Adiciona um novo barbeiro ao sistema."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Nome do barbeiro"
 *               email:
 *                 type: string
 *                 description: "Email do barbeiro"
 *               phone:
 *                 type: string
 *                 description: "Telefone do barbeiro"
 *               password:
 *                 type: string
 *                 description: "Senha do barbeiro"
 *               confirmPassword:
 *                 type: string
 *               workSchedule:
 *                 type: string
 *                 description: "Horário de trabalho do barbeiro em formato de string"
 *     responses:
 *       201:
 *         description: "Barbeiro criado com sucesso!"
 *       400:
 *         description: "Todos os campos são obrigatórios ou formato de dados inválido!"
 *       409:
 *         description: "Barbeiro já cadastrado!"
 *       500:
 *         description: "Erro ao criar barbeiro"
 */

router.post('/register', BarberController.register);

module.exports = router;
