const express = require("express");
const cors = require("cors");
const swaggerSetup = require("./config/swagger");

const app = express();
swaggerSetup(app);
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static("public"));

const UserRoutes = require("./routes/UserRoutes");
const BarberRoutes = require("./routes/BarberRoutes");
const ServiceRoutes = require("./routes/ServiceRoutes");
const AppointmentRoutes = require("./routes/AppointmentRoutes");

app.use("/users", UserRoutes);
app.use("/barbers", BarberRoutes);
app.use("/services", ServiceRoutes);
app.use("/appointments", AppointmentRoutes);
app.listen(8080);
