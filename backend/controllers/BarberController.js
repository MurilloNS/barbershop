const Barber = require('../models/Barber')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { formatTimestamp } = require('../utils/formatTimestamp')
const { isEmailValid, isPasswordValid } = require('../utils/validEmailPassword')
require('dotenv').config()

module.exports = class BarberController {
  static async register(req, res) {
    const { name, email, phone, password, confirmPassword, workSchedule } = req.body
    const timestamp = formatTimestamp()
    const path = req.originalUrl

    if (!name || !email || !phone || !password || !confirmPassword || !workSchedule) {
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
      const barberExists = await Barber.findOne({ email: email })

      if (barberExists) {
        return res.status(409).json({
          status: 409,
          error: 'Conflict',
          message: 'Barbeiro já cadastrado!',
          timestamp,
          path
        })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const newBarber = new Barber({
        name,
        email,
        phone,
        password: hashedPassword,
        workSchedule
      })

      await newBarber.save()
      const token = jwt.sign(
        {
          id: newBarber._id,
          email: newBarber.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      return res.status(201).json({
        status: 201,
        message: 'Barbeiro criado com sucesso!',
        token,
        timestamp,
        path
      })

    } catch (e) {
      console.error('ERROR', e);
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: 'Erro ao criar barbeiro!',
        timestamp,
        path,
      });
    }
  }
}