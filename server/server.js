const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
//cors has changed -> use react port
app.use(cookieParser(), cors({credentials:true, origin:'http://localhost:3000'}), express.urlencoded({extended:true}), express.json())

require('./config/config')
require('./models/model')
require('./routes/routes')(app)

app.listen(8000, () => console.log(`server is locked and loaded on port 8000`))
