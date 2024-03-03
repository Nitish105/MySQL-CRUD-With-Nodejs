//common js
const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv  = require('dotenv')
const mySqlPool = require('./config/db')


//configure dotenv
dotenv.config()

//rest object
const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/student', require('./routes/studentRoutes'))
app.get('/test', (req, res) => {
    res.status(200).send('<h1>Node MySql app</h1>')
})

//port 
const PORT = process.env.PORT || 8080;

//conditionally listen from mysqlPool
mySqlPool.query('SELECT 1').then(() => {
    //mysql
    console.log('MySQL DB Connected'.bgCyan.white);
    //listen
    app.listen(PORT, () => {
        console.log(`Server is running on Port ${process.env.PORT}`.bgMagenta.white);
    })
})
.catch((error) => { 
    console.log(error);
})

