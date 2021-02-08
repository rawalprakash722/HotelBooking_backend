const express=require('express')
const router=express.Router()
const hotel=require('../models/hotelModel')
const authenticate=require('../middleware/authenticate')   //providing path for authenticate.js
const imageUpload=require('../middleware/imageUpload')
const { count } = require('../models/hotelModel')

//for inserting liquor items
router.post('/hotel/insert',imageUpload.single('hotelImage'),function(req,res){
    console.log(req.file)
    if(req.file == undefined){
        return res.status(400).json({message : "Only image files are allowed."})
    }
    const hotelName=req.body.hotelName
    const hotelType=req.body.hotelType
    const hotelPrice=req.body.hotelPrice
    const hotelMl=req.body.hotelMl
    // const hotelImage=req.body.productImage

    const hotelData=new hotel({
        hotelImage:req.file.path,
        hotelPrice:hotelPrice,
        hotelMl:hotelMl,
        hotelName:hotelName,
        hotelType:hotelType})
    
    hotelData.save().then(function(result){
        res.status(201).json({message:"hotel Added Successfully."})
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })

})

router.put('/hotel/update',function(req,res){
    const id=req.body.id
    // const hotelImage=req.body.hotelImage
    const hotelPrice=req.body.hotelPrice
    const hotelMl=req.body.hotelMl
    const hotelName=req.body.hotelName
    const hotelType=req.body.hotelType

    hotel.updateOne({_id:id},{hotelName:hotelName,hotelType:hotelType,hotelPrice:hotelPrice,hotelMl:hotelMl})
    .then(function(result){
        res.status(200).json({message:"hotel updated successfully!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
})

router.put('/hotel/updateImage/:id', imageUpload.single('hotelImage'), function (req, res) {
    const id = req.params.id
    const hotelImage = req.file.path;
    hotel.updateOne({ _id: id }, {
        hotelImage: hotelImage
    }).then(function (result) {
        res.status(200).json({ staus: "true", message: "Image updated" })
    })
        .catch(function (e) {
            res.status(500).json(e)
        })
})

router.delete('/hotel/delete/:hotelId',function(req,res){
    const pid=req.params.hotelId
    hotel.deleteOne({_id:pid})
    .then(function(result){
        res.status(200).json({message:"hotel deleted successfully",status:"true"})
    })
    .catch(function(err){
        res.status(500).json({message:err,status:"false"})
    })
})

//Fetch all data from db
router.get('/hotel/all',function(req,res){
    hotel.find().then(function(info){
        
        
        res.status(200).json({
           
            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})

router.get('/hotel/all:hotelType',function(req,res){
    const hotelType=req.params.hotelType
    hotel.find({hotelType:hotelType}).then(function(info){
        
        res.status(200).json({
           
            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})

router.get('/hotel/type/:hotelType',function(req,res){
    const hotelType=req.params.hotelType
    hotel.find({hotelType:hotelType}).then(function(info){
        
        res.status(200).json({
           
            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})
router.get('/beer',function(req,res){
    hotel.find({hotelType:"Beer"}).limit(4).then(function(info){
        res.status(200).json({   
            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})

router.get('/beer/all',function(req,res){
    hotel.find({hotelType:"Beer"}).then(function(info){
        res.status(200).json({
           
            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})


router.get('/hotel/one/:id',function(req,res){
    const id=req.params.id
    hotel.findOne({_id:id})
    .then(function(info){
        res.status(200).json(info)
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})

module.exports=router