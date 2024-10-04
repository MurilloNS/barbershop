const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { formatTimestamp } = require('../utils/formatTimestamp')
const { isEmailValid, isPasswordValid } = require('../utils/validEmailPassword')
require('dotenv').config()

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body

    const timestamp = formatTimestamp();
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

    if (!isEmailValid(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Formato de e-mail inválido!',
        timestamp,
        path,
      })
    }

    if (!isPasswordValid(password)) {
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

  static async login(req, res) {
    const { email, password } = req.body;
    const timestamp = formatTimestamp()
    const path = req.originalUrl

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'E-mail e senha são obrigatórios!',
        timestamp,
        path
      })
    }

    try {
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'Not Found',
          message: 'Usuário não encontrado!',
          timestamp,
          path
        })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized',
          message: 'Senha inválida!',
          timestamp,
          path
        })
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      return res.status(200).json({
        status: 200,
        message: 'Login realizado com sucesso!',
        token,
        timestamp,
        path
      })
    } catch (e) {
      console.error('ERROR', e)
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: 'Erro ao realizar login!',
        timestamp,
        path
      })
    }
  }

  static async update(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body;
    const timestamp = formatTimestamp();
    const path = req.originalUrl;

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
        message: 'Token não fornecido!',
        timestamp,
        path,
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'Not Found',
          message: 'Usuário não encontrado!',
          timestamp,
          path,
        });
      }

      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;

      if (password) {
        if (!isPasswordValid(password)) {
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

        user.password = await bcrypt.hash(password, 10);
      }
      await user.save();

      return res.status(200).json({
        status: 200,
        message: 'Cadastro atualizado com sucesso!',
        timestamp,
        path,
      });
    }
    catch (e) {
      console.error('ERROR', e);
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: 'Erro ao atualizar cadastro!',
        timestamp,
        path,
      });
    }
  }
}