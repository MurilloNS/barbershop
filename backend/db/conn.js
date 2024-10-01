const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb://localhost:27017/barbershop')
}

main().catch((err) => console.error(err))

module.exports = mongoose