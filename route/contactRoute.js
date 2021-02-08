const express=require('express')
const router=express.Router()
const contact=require('../models/contactModel')
const authenticate=require('../middleware/authenticate') 

router.post('/message/insert',function(req,res){
    const fullName=req.body.fullName
    const subject=req.body.subject
    const email=req.body.email
    const message=req.body.message

    const contactInfo=new contact({
        fullName:fullName,
        subject:subject,
        email:email,
        message:message
    })
    contactInfo.save().then(function(result){
        res.status(201).json({message:"Message sent successfully"})
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
})

router.get('/message/all',function(req,res){
    contact.find().then(function(info){
        
        
        res.status(200).json({
           
            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})
module.exports=router