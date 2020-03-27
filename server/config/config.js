const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/learning_dashboard2', {
    useNewUrlParser:true, useUnifiedTopology:true
})
mongoose.set('useCreateIndex', true)
    // .then(() => console.log(`db connection established`))
    // .catch((err) => console.log(`db connection failed`, err))
