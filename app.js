const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/auth',require('./routes/auth_routes'))

app.get('/',(req,res)=>{
    res.status(200).json({message: "backend is running"})
})

app.listen(process.env.PORT, ()=>{
    console.log(`server started at port ${process.env.PORT}`)
})