const Barber = require("../models/Barber");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { formatTimestamp } = require("../utils/formatTimestamp");
const {
  isEmailValid,
  isPasswordValid,
} = require("../utils/validEmailPassword");
require("dotenv").config();

module.exports = class BarberController {
  static async getAllBarbers(req, res) {
    const timestamp = formatTimestamp();
    const path = req.originalUrl;

    try {
      const barbers = await Barber.find().select("-password -__v");

      if (!barbers.length) {
        return res.status(404).json({
          status: 404,
          error: "Not Found",
          message: "Nenhum barbeiro encontrado!",
          timestamp,
          path,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Lista os barbeiros recuperados com sucesso!",
        barbers,
        timestamp,
        path,
      });
    } catch (e) {
      console.error("ERROR", e);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Erro ao recuperar lista de barbeiros!",
        timestamp,
        path,
      });
    }
  }

  static async register(req, res) {
    const { name, email, phone, password, confirmPassword, workSchedule } =
      req.body;
    const timestamp = formatTimestamp();
    const path = req.originalUrl;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !workSchedule
    ) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: "Todos os campos são obrigatórios!",
        timestamp,
        path,
      });
    }

    if (!isEmailValid(email)) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: "Formato de e-mail inválido!",
        timestamp,
        path,
      });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message:
          "A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra e um número!",
        timestamp,
        path,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: "As senhas precisam ser iguais!",
        timestamp,
        path,
      });
    }

    try {
      const barberExists = await Barber.findOne({ email: email });

      if (barberExists) {
        return res.status(409).json({
          status: 409,
          error: "Conflict",
          message: "Barbeiro já cadastrado!",
          timestamp,
          path,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newBarber = new Barber({
        name,
        email,
        phone,
        password: hashedPassword,
        workSchedule,
      });

      await newBarber.save();
      const token = jwt.sign(
        {
          id: newBarber._id,
          email: newBarber.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(201).json({
        status: 201,
        message: "Barbeiro criado com sucesso!",
        token,
        timestamp,
        path,
      });
    } catch (e) {
      console.error("ERROR", e);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Erro ao criar barbeiro!",
        timestamp,
        path,
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const timestamp = formatTimestamp();
    const path = req.originalUrl;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: "E-mail e senha são obrigatórios!",
        timestamp,
        path,
      });
    }

    try {
      const barber = await Barber.findOne({ email });

      if (!barber) {
        return res.status(404).json({
          status: 404,
          error: "Not Found",
          message: "E-mail não cadastrado!",
          timestamp,
          path,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, barber.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          status: 401,
          error: "Unauthorized",
          message: "Senha inválida!",
          timestamp,
          path,
        });
      }

      const token = jwt.sign(
        {
          id: barber._id,
          email: barber.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        status: 200,
        message: "Login realizado com sucesso!",
        token,
        timestamp,
        path,
      });
    } catch (e) {
      console.error("ERROR", e);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Erro ao realizar login!",
        timestamp,
        path,
      });
    }
  }

  static async update(req, res) {
    const { name, email, phone, workSchedule, password, confirmPassword } =
      req.body;
    const timestamp = formatTimestamp();
    const path = req.originalUrl;
    const token = req.headers["authorization"]?.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const barberId = decoded.id;
      const barber = await Barber.findById(barberId);

      if (!barber) {
        return res.status(404).json({
          status: 404,
          error: "Not Found",
          message: "Barbeiro não encontrado",
          timestamp,
          path,
        });
      }

      barber.name = name || barber.name;
      barber.email = email || barber.email;
      barber.phone = phone || barber.phone;
      barber.workSchedule = workSchedule || barber.workSchedule;

      if (password) {
        if (!isPasswordValid(password)) {
          return res.status(400).json({
            status: 400,
            error: "Bad Request",
            message:
              "A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra e um número!",
            timestamp,
            path,
          });
        }

        if (password !== confirmPassword) {
          return res.status(400).json({
            status: 400,
            error: "Bad Request",
            message: "As senhas precisam ser iguais!",
            timestamp,
            path,
          });
        }

        barber.password = await bcrypt.hash(password, 10);
      }

      await barber.save();

      return res.status(200).json({
        status: 200,
        message: "Cadastro atualizado com sucesso!",
        timestamp,
        path,
      });
    } catch (e) {
      console.error("ERROR", e);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Erro ao atualizar cadastro",
        timestamp,
        path,
      });
    }
  }

  static async delete(req, res) {
    const timestamp = formatTimestamp();
    const path = req.originalUrl;
    const token = req.headers["authorization"]?.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const barberId = decoded.id;
      const barber = await Barber.findById(barberId);

      if (!barber) {
        return res.status(404).json({
          status: 404,
          error: "Not Found",
          message: "Barbeiro não encontrado!",
        });
      }

      await Barber.findByIdAndDelete(barberId);

      return res.status(200).json({
        status: 200,
        message: "Cadastro deletado com sucesso!",
        timestamp,
        path,
      });
    } catch (e) {
      console.error("ERROR", e);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Erro ao deletar cadastro!",
        timestamp,
        path,
      });
    }
  }
};
