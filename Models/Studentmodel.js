const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    batch: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        default:undefined,
        require:false,
        ref: 'Mentor'
    }
})
module.exports = mongoose.model('Student',studentSchema);