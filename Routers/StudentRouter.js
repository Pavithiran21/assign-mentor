const express = require('express');

const Student = require('../Models/Studentmodel');

const router = express.Router();
router.get('/',async (req,res) => {
    try{
        const students = await Student.find({}).populate('Mentor').exec((err,result) =>{
            if(!err){
                res.json(result)
            }
        });
    }catch(err){
        res.status(400).send(err);
    }
})
router.post('/addStudent',async (req,res) =>{
    const addStudent = new Student({
        "name":req.body.name,
        "batch":req.body.batch,
         "email":req.body.email,
         "mentor":undefined
    })
    try{
        const newStudent = await addStudent.save();
        res.send(newStudent)
    }catch(err){
        res.status(500);
        res.send(err);
    }
})
router.get('/no-mentors',async (req,res) =>{
    const students = await Student.find({mentor:undefined})
    res.send(students);
})
router.patch('/assign-mentor/:id',async (req,res) =>{
    const {id} = req.params;
    const {mentor} = req.body;
    try {
        const student = await  Student.findById(id);
        student.mentor = mentor;
        await student.save();
        res.send(student);
    }catch(err){
        res.status(500);
        res.send(err);
    }
})
router.patch('/assign-mentor-students',async (req,res) =>{
    const {mentor,stud_list} = req.body;
    console.log(stud_list)
    try {
        stud_list.map(async(stud_list) => {
         const student = await  Student.findById(stud_list);
         student.mentor = mentor;
         await student.save();
        })
        let mentorList = await  Student.find({mentor:mentor});
        res.send(mentorList);
        
    }catch(err){
        res.status(500);
        res.send(err);
    }
})
router.get('/getStudentMentors/:id',async (req,res) =>{
    const {id} = req.params;
    try{
        const students = await Student.find({mentor : id});
        res.send(students);
    }catch(err){
        res.send(err);
    }
})
module.exports = router;