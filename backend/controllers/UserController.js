const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Formato de e-mail inválido!',
        timestamp,
        path,
      })
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra e um número!',
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

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = new User({ name, email, phone, password: hashedPassword })
      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
          email: newUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      return res.status(201).json({
        status: 201,
        message: 'Usuário criado com sucesso!',
        token,
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