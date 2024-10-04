const router = require('express').Router();
const UserController = require('../controllers/UserController');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

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
 *
 * /users/login:
 *   post:
 *     tags:
 *       - "Usuários"
 *     summary: "Login de usuário"
 *     description: "Autentica um usuário e retorna um token JWT se as credenciais forem válidas."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Login realizado com sucesso!"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: "Token JWT para autenticação"
 *       400:
 *         description: "E-mail e senha são obrigatórios!"
 *       401:
 *         description: "Senha incorreta!"
 *       404:
 *         description: "Usuário não encontrado!"
 *       500:
 *         description: "Erro ao realizar login"
 *
 * /users/update:
 *   patch:
 *     tags:
 *       - "Usuários"
 *     summary: "Atualizar perfil do usuário"
 *     description: "Atualiza as informações do perfil de um usuário autenticado."
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
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Cadastro atualizado com sucesso!"
 *       400:
 *         description: "As senhas precisam ser iguais!"
 *       401:
 *         description: "Token não fornecido ou inválido!"
 *       404:
 *         description: "Usuário não encontrado!"
 *       500:
 *         description: "Erro ao atualizar cadastro!"
 * 
 * /users/delete:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - "Usuários"
 *     summary: "Deletar cadastro do usuário"
 *     description: "Remove o cadastro do usuário autenticado."
 *     responses:
 *       200:
 *         description: "Cadastro deletado com sucesso!"
 *       401:
 *         description: "Token não fornecido ou inválido!"
 *       404:
 *         description: "Usuário não encontrado!"
 *       500:
 *         description: "Erro ao deletar cadastro"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.post('/register', UserController.register);
router.post('/login', UserController.login)
router.patch('/update', jwtAuthMiddleware, UserController.update)
router.delete('/delete', jwtAuthMiddleware, UserController.delete)

module.exports = router;
