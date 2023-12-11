const mongoose = require('mongoose')
module.exports = async () => {
    mongoose.set('strictQuery', true)
    const uri =
        'mongodb+srv://sidougmr2:test1234@cluster0.zi4jmrj.mongodb.net/GmrDaily?retryWrites=true&w=majority'
    try {
        const connectionParams = {
            // useNewUrlParser: true,
            // useCreateIndex: true,
            // useUnifiedTopology: true,
        }
        await mongoose.connect(uri, connectionParams)
        console.log('Connected to the database.')
    } catch (error) {
        console.error('Could not connect to the database.', error)
    }
}
