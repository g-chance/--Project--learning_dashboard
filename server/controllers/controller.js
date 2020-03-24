const mongoose = require('mongoose')
const PrimaryObject = mongoose.model('PrimaryObject')
const jwt = require('jsonwebtoken')
const secret = "bacon"
const bcrypt = require('bcrypt')

module.exports = {
    create : (req, res) => {
        PrimaryObject.create(req.body)
        .then(response => res.json(response))
        .catch(error => res.status(400).json(error))
    },
    find : (req, res) => {
        PrimaryObject.find()
        .then(response => res.json(response))
        .catch(error => res.status(400).json(error))
    },
    findTasks : (req, res) => {
        PrimaryObject.find({_id:req.params.id, "tasks":{$exists: true}})
        .then(response => res.json(response))
        .catch(error => res.status(400).json(error))
    },
    findOne : (req, res) => {
        PrimaryObject.findOne({_id:req.params.id})
        .then(response => res.json(response))
        .catch(error => res.status(400).json(error))
    },
    updateOne : (req, res) => {
        PrimaryObject.updateOne({_id:req.params.id}, req.body, {new:true, runValidators:true})
        .then(response => res.json(response))
        .catch(error => res.status(400).json(error))
    },
    deleteOne : (req, res) => {
        PrimaryObject.deleteOne({_id:req.params.id})
        .then(response => res.json(response))
        .catch(error => res.status(400).json(error))
    },
    // you can change the json messages accordingly to help you on the front end to determine what to do
    // e.g. trigger specific validation messages / redirect to other pages / etc.
    // I changed these messages so that you can see which error belongs to what.
    login: (req, res) => {
        console.log(req.body)
        PrimaryObject.findOne({email:req.body.email})
            .then(userFromDB => {
                if(userFromDB === null) {
                    res.json({msg: "User not found in database"})
                } else {
                    bcrypt.compare(req.body.password, userFromDB.password)
                    .then(bcryptCheckBoolean => {
                        if(bcryptCheckBoolean) {
                            // secret has to be the second argument here on newJWT not on res.cookie
                            // secret has to match the one from the authenticate they use on config jwt
                            // i have moved it here so that there is only one secret to use.
                            const newJWT = jwt.sign({_id:userFromDB._id}, secret)
                            // there are many more options like expiration to control here.
                            // httpOnly allows only the server to revoke the cookie.
                            res.cookie('usertoken', newJWT, {
                                httpOnly:true
                            }).json({msg:"success"})
                        } else {
                            res.json({msg:"Password is not correct"})
                        }
                    })
                    .catch(error => res.json({msg:"bcrypt compare has failed here for some reason"}))
                }
            })
            .catch(error2 => {
                console.log(error2)
                res.json({msg:"DB has failed to run the query", error:error2})
            })
    },
    logout:(req, res) => {
        console.log('got here')
        res.clearCookie('usertoken').json({msg:'logged out'})
    },
    // i moved this function here because it uses the req, res, next and it seems silly to have it
    // in a different file altogether when it uses the same variables and secret.
    authenticate: (req, res, next) => {
        // if you used a different key for the cookie req.cookies.usertoken has to match that key.
        jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
            console.log(payload)
            if(err) {
                res.status(401).json({verfied:false})
            } else {
                next();
            }
        })
    }

}