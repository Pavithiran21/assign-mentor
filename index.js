const express = require('express')
const mentorRouter = require('./Routers/MentorRouters')
const studentRouter = require('./Routers/StudentRouter')

var bodyParser = require('body-parser')
const app = express();

const cors = require('cors');
app.use(cors());

const dotenv=require('dotenv')
dotenv.config()

const connectDB = require('./config/db')
connectDB()
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json())

app.use('/mentor', mentorRouter)
app.use('/student',studentRouter)


const PORT = process.env.PORT || 9000

app.listen(PORT,() => console.log(`Server Running in the port ${PORT}`));