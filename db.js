const mongoose = require('mongoose')
module.exports = async () => {
    mongoose.set('strictQuery', true)

    try {
        await mongoose.connect(process.env.DATABASE_URI_KEY)
        console.log('Connected to the database.')
    } catch (error) {
        console.error('Could not connect to the database.', error)
    }
}
