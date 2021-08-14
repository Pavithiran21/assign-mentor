const express = require('express');

const Mentor = require('../Models/Mentormodel');
const router = express.Router();
router.get('/listMentors',async(req,res) => {
    try{
        const mentors = await Mentor.find();
        res.json({status:true,data:mentors});
    }catch(err){
        res.status(400).send(err);
    }
})
router.post('/addMentor',async(req,res) => {
    console.log(req.body)
   const {name,email,course} = req.body;
   const addMentor = new Mentor ({
       "name":name,
       "email":email,
       "course":course
   })
   try{
       const newMentor = await addMentor.save();
       res.send(newMentor)
   }catch(err){
       res.status(500);
       res.send(err);
   }
})
router.get('/get-mentor/:id',async(req,res) => {
    const {id} = req.params;
    try{
        const mentor = await Mentor.findById({_id:id})
        res.status(200).send(mentor);
    }catch(err){
        res.status(500);
        res.send(err);
    }
})
module.exports = router;