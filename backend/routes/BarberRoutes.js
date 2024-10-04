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
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 description: "Email do barbeiro"
 *                 example: "joao.silva@exemplo.com"
 *               phone:
 *                 type: string
 *                 description: "Telefone do barbeiro"
 *                 example: "+5511999999999"
 *               password:
 *                 type: string
 *                 description: "Senha do barbeiro"
 *                 example: "senhaSegura123"
 *               confirmPassword:
 *                 type: string
 *                 description: "Confirmação da senha"
 *                 example: "senhaSegura123"
 *               workSchedule:
 *                 type: array
 *                 description: "Horário de trabalho do barbeiro"
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       description: "Dia da semana"
 *                       example: "Segunda"
 *                     start:
 *                       type: string
 *                       description: "Horário de início (HH:mm)"
 *                       example: "09:00"
 *                     end:
 *                       type: string
 *                       description: "Horário de término (HH:mm)"
 *                       example: "18:00"
 *     responses:
 *       201:
 *         description: "Barbeiro criado com sucesso!"
 *       400:
 *         description: "Todos os campos são obrigatórios ou formato de dados inválido!"
 *       409:
 *         description: "Barbeiro já cadastrado!"
 *       500:
 *         description: "Erro ao criar barbeiro"
 * 
 * /barbers/login:
 *   post:
 *     tags:
 *       - "Barbeiros"
 *     summary: "Login de barbeiros"
 *     description: "Autentica um barbeiro e retorna um token JWT se as credenciais forem válidas."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Email do barbeiro"
 *                 example: "joao.silva@exemplo.com"
 *               password:
 *                 type: string
 *                 description: "Senha do barbeiro"
 *                 example: "senhaSegura123"
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
 */

router.post('/register', BarberController.register);
router.post('/login', BarberController.login)

module.exports = router;
