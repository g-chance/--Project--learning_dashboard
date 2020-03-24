const controller = require('../controllers/controller')

module.exports = app => {
    app.get('/api/v1/find', controller.authenticate, controller.find);
    app.get('/api/v1/findAll', controller.find);
    app.get('/api/v1/findOne/:id', controller.findOne);
    app.get('/api/v1/findTasks/:id', controller.findTasks);
    app.post('/api/v1/create', controller.create);
    app.put('/api/v1/updateOne/:id', controller.updateOne);
    app.delete('/api/v1/deleteOne/:id', controller.deleteOne);
    app.post('/api/v1/login', controller.login)
    app.get('/api/v1/logout', controller.logout)

}