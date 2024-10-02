const User = require('../models/User')

module.exports = class UserController {
  static formatTimestamp() {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  static async register(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body

    const timestamp = UserController.formatTimestamp();
    const path = req.originalUrl

    if (!name || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Todos os campos são obrigatórios!',
        timestamp,
        path
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'As senhas precisam ser iguais!',
        timestamp,
        path,
      });
    }

    try {
      const userExists = await User.findOne({ email: email })

      if (userExists) {
        return res.status(409).json({
          status: 409,
          error: 'Conflict',
          message: 'Usuário já cadastrado!',
          timestamp,
          path,
        });
      }

      const newUser = new User({ name, email, phone, password })
      await newUser.save();

      return res.status(201).json({
        status: 201,
        message: 'Usuário criado com sucesso!',
        timestamp,
        path,
      });
    } catch (e) {
      console.error('ERROR', e);
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: 'Erro ao criar usuário!',
        timestamp,
        path,
      });
    }
  }
}