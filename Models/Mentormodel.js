const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name :{
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true,
        unique:true
    },
    course: {
        type:String,
        require:true
    }
})
module.exports = mongoose.model('Mentor',mentorSchema);