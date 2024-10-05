const Barber = require("../models/Barber");
const Service = require("../models/Service");
const { formatTimestamp } = require("../utils/formatTimestamp");

module.exports = class ServiceController {
  static async create(req, res) {
    const { name, price, duration, description } = req.body;
    const timestamp = formatTimestamp();
    const path = req.originalUrl;
    const barber = await Barber.findById(req.user.id);

    if (!barber) {
      return res.status(403).json({
        status: 403,
        error: "Forbidden",
        message: "Somente barbeiros podem criar novos serviços.",
        timestamp,
        path,
      });
    }

    if (!name || !price || !duration || !description) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: "Nome, preço e duração são obrigatórios",
        timestamp,
        path,
      });
    }

    const durationValid = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

    if (!durationValid.test(duration)) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: "A duração deve estar no formato HH:MM (ex: 01:30)!",
        timestamp,
        path,
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: "O preço deve ser um número positivo!",
        timestamp,
        path,
      });
    }

    try {
      const existService = await Service.findOne({ name });

      if (existService) {
        return res.status(409).json({
          status: 409,
          error: "Conflict",
          message: "Serviço já cadastrado!",
          timestamp,
          path,
        });
      }

      const newService = new Service({
        name,
        price,
        duration,
        description,
      });

      await newService.save();

      return res.status(201).json({
        status: 201,
        message: "Serviço criado com sucesso!",
        timestamp,
        path,
      });
    } catch (e) {
      console.error("ERROR", e);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Erro ao criar o serviço!",
        timestamp,
        path,
      });
    }
  }
};
