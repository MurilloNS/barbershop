const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const Barber = require("../models/Barber");
const { formatTimestamp } = require("../utils/formatTimestamp");

module.exports = class AppointmentController {
  static async schedule(req, res) {
    const { barberId, userId, serviceId, date } = req.body;
    const timestamp = formatTimestamp();
    const path = req.originalUrl;

    if (!barberId || !userId || !serviceId || !date) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: "Todos os campos são obrigatórios!",
        timestamp,
        path,
      });
    }

    try {
      const barber = await Barber.findById(barberId);
      if (!barber) {
        return res.status(404).json({
          status: 404,
          error: "Not Found",
          message: "Barbeiro não encontrado!",
          timestamp,
          path,
        });
      }

      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({
          status: 404,
          error: "Not Found",
          message: "Serviço não encontrado!",
          timestamp,
          path,
        });
      }

      const [hours, minutes] = service.duration.split(":".map(Number));
      const duration = (hours * 60 + minutes) * 60 * 1000;

      const appointmentDate = new Date(date);
      const endDate = new Date(appointmentDate.getTime() + duration);

      const appointments = await Appointment.find({
        barberId,
        date: { $gte: appointmentDate, $lt: endDate },
      });

      if (appointments.length) {
        return res.status(409).json({
          status: 409,
          error: "Conflict",
          message: "Barbeiro não disponível nesse horário!",
          timestamp,
          path,
        });
      }

      const newAppointment = new Appointment({
        barberId,
        userId,
        serviceId,
        date: appointmentDate,
      });

      await newAppointment.save();

      return res.status(201).json({
        status: 201,
        message: "Agendamento criado com sucesso!",
        appointment: newAppointment,
        timestamp,
        path,
      });
    } catch (e) {
      console.error("error", e);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Erro ao criar agendamento!",
        timestamp,
        path,
      });
    }
  }
};