const express = require('express')
const cors = require('cors')
const swaggerSetup = require('./config/swagger')

const app = express()
swaggerSetup(app);
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.static('public'))

const UserRoutes = require('./routes/UserRoutes')
const BarberRoutes = require('./routes/BarberRoutes')

app.use('/users', UserRoutes)
app.use('/barbers', BarberRoutes)
app.listen(8080)