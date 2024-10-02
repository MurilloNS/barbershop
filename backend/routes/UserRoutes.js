const router = require('express').Router();
const UserController = require('../controllers/UserController');

/**
 * @swagger
 * tags:
 *   - name: "Usuários"
 *     description: "Operações relacionadas a usuários"
 * 
 * /users/register:
 *   post:
 *     tags:
 *       - "Usuários"
 *     summary: "Registrar um novo usuário"
 *     description: "Adiciona um novo usuário ao sistema."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: "Usuário criado com sucesso!"
 *       409:
 *         description: "Usuário já cadastrado!"
 *       400:
 *         description: "Todos os campos são obrigatórios!"
 *       500:
 *         description: "Erro ao criar usuário"
 */

router.post('/register', UserController.register);

module.exports = router;
