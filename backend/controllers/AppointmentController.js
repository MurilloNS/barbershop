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

      const [hours, minutes] = service.duration.split(":").map(Number);
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

  static async listAppointmentsByBarber(req, res) {
    const { barberId } = req.params;
    const timestamp = formatTimestamp();
    const path = req.originalUrl;

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

      const appointments = await Appointment.find({ barberId }).populate(
        "userId serviceId",
        "name price duration"
      );

      return res.status(200).json({
        status: 200,
        message: "Agendamento(s) recuperados com sucesso!",
        appointments,
        timestamp,
        path,
      });
    } catch (e) {
      console.error("ERROR", e);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Erro ao listar agendamentos!",
        timestamp,
        path,
      });
    }
  }

  static async getById(req, res) {
    const { appointmentId } = req.params;
    const timestamp = formatTimestamp();
    const path = req.originalUrl;

    try {
      const appointment = await Appointment.findById(appointmentId).populate(
        "barberId userId serviceId",
        "name price duration"
      );

      if (!appointment) {
        return res.status(404).json({
          status: 404,
          error: "Not Found",
          message: "Agendamento não encontrado!",
          timestamp,
          path,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Agenamento encontrado com sucesso!",
        appointment,
        timestamp,
        path,
      });
    } catch (e) {
      console.error("ERROR", e);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Erro ao buscar o agendamento!",
        timestamp,
        path,
      });
    }
  }

  static async update(req, res) {
    const { appointmentId } = req.params;
    const updates = req.body;
    const timestamp = formatTimestamp();
    const path = req.originalUrl;

    try {
      const appointment = await Appointment.findById(appointmentId);

      if (!appointment) {
        return res.status(404).json({
          status: 404,
          error: "Not Found",
          message: "Agendamento não encontrado!",
          timestamp,
          path,
        });
      }

      Object.keys(updates).forEach((key) => {
        appointment[key] = updates[key];
      });

      await appointment.save();

      return res.status(200).json({
        status: 200,
        message: "Agendamento atualizado com sucesso!",
        appointment,
        timestamp,
        path,
      });
    } catch (e) {
      console.error("ERROR", e);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Erro ao atualizar o agendamento!",
        timestamp,
        path,
      });
    }
  }
};
