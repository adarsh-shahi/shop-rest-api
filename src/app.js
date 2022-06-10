const express = require('express')
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')

const app = express()
dotenv.config()
const port = process.env.PORT

mongoose.connect(process.env.MONGO_URL, 
{
    useNewUrlParser: true
}).then(() => {
    console.log('DB connected successfully');
}).catch((e) => {
    console.log(e);
})

app.use(express.json())
app.use('/users/auth', authRoutes)









app.listen(port, () => {
    console.log('server running on port: ' + port);
})