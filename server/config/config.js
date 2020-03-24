const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/learning_dashboard', {
    useNewUrlParser:true, useUnifiedTopology:true
})
    .then(() => console.log(`db connection established`))
    .catch((err) => console.log(`db connection failed`, err))
