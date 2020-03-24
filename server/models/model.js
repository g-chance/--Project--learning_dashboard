const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const emailRegexChecker = (val) => {
    if(/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val)) {
        return true
    } else {
        return false
    }
}
const customValidator = (arg) => {
    if(arg.length === 0) {
        return true
    } else if(arg.length < 10) {
        return false
    } else {
        return true
    }
}

const PrimaryObjectSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:[true, "First name is required"]
    },
    lastName: {
        type:String,
        required:[true, "Last name is required"]
    },
    email: {
        type:String,
        required:[true, "Email is required"],
        validate:[emailRegexChecker, "Please enter a valid email"]
    },
    password: {
        type:String,
        required:[true, "Password is required"],
        minlength:[8, "Password must be 8 characters or longer"]
    },
    tasks: [
        {
            title: {
                type: String,
                required: [true, "Task Name is required"]
            },
            description: {
                type: String,
                validate: [customValidator, "Description must be at least 10 characters"]
            },
            startDate: {
                type: Date,
                required: [true, 'Start Date is required']
            },
            dueDate: {
                type: Date,
            },
            timeSpent: {
                type: Number,
                default: 0,
            },
            status: {
                type: Number,
                default: 0,
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
        }, {timestamps: true},
    ]
}, {timestamps:true})

PrimaryObjectSchema.virtual('confirmPassword')
.get(() => this._confirmPassword)
.set((value) => this._confirmPassword = value)

// this function is written in ES5 (no arrow) because the scope of this will change
PrimaryObjectSchema.pre('validate', function(next) {
    //this one is not ._ because we send .confirmPassword on the form from the frontend
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Passwords do not match")
    }
    next();
})

PrimaryObjectSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
})

mongoose.model("PrimaryObject", PrimaryObjectSchema)