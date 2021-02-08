const express=require('express')
const router=express.Router()
const hotel=require('../models/hotelModel')
const cart=require('../models/cartModel')
const auth=require('../middleware/authenticate')
const imageUpload=require('../middleware/imageUpload')


router.post('/add/cart',imageUpload.single('hotelImage'),function(req,res){
  
    if(req.file == undefined){
        return res.status(400).json({message : "Only image files are allowed."})
    }
    const hotelName=req.body.hotelName
    // const hotelType=req.body.hotelType
    const hotelPrice=req.body.hotelPrice
    const hotelMl=req.body.hotelMl
    const hotelQty=req.body.hotelQty

    
    const cartData=new cart({
        hotelImage:req.file.path,
        hotelPrice:hotelPrice,
        hotelMl:hotelMl,
        hotelName:hotelName,
        // hotelType:hotelType,
        hotelQty:hotelQty})
    
    cartData.save().then(function(result){
        res.status(201).json({success:true,message:"Room booked successfully."})
    })
    .catch(function(e){
        res.status(500).json({message:e})
        console.log(e)
    })
    
})


router.post('/add/cart2/:id',auth.checkUser,auth.checkCustomer,function(req,res){
    const id=req.params.id
//    const hotelId=req.params.hotelId
   const userId=req.data._id
    const hotelQty=req.body.hotelQty
    hotel.findOne({_id:id})
    .then(function(data){
        const price=data.hotelPrice*hotelQty
        
        const cartData=new cart({
            hotelId:id,userId:userId,hotelQty:hotelQty,hotelPrice:price
           })
           cartData.save().then(function(result){
            res.status(201).json({success:true,message:"Room booked successfully."})
        })
        
        
    })
    .catch(function(e){
        res.status(500).json({message:e})
        console.log(e)
    })

    
    
})
router.get('/cart/all',auth.checkUser,auth.checkCustomer,function(req,res){
    cart.find({"userId":req.data._id}).populate({"path":"hotelId"}).then(function(info){
        // var parse=JSON.parse(JSON.stringify(info))

        // console.log(parse)

        info.forEach(element => {
           const data=element.hotelId.hotelName
           
        });
        res.status(200).json({
            data:info
           
        }) 
       
    }).catch(function(err){
        res.status(500).json({error:err})
        console.log(err)
    })
})
router.get('/cart/one/:id',function(req,res){
    const id=req.params.id
    cart.findOne({_id:id})
    .then(function(data){
        res.status(200).json({data})
        console.log(data)
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})

router.delete('/cart/delete/:id',function(req,res){
    const id=req.params.id
    cart.deleteOne({_id:id})
    .then(function(result){
        res.status(200).json({success:true,message:"Deleted"})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})

router.put('/cart/update/:id',auth.checkUser,auth.checkCustomer,function(req,res){
    const id=req.params.id
    const hotelQty=req.body.hotelQty
    cart.find().then(function(data){
        const price=1550*hotelQty
            cart.updateOne({_id:id},{
               
                    hotelQty:hotelQty,hotelPrice:price
                    
                
            }) .then(function(result){
                res.status(200).json({success:true,message:"Updated"})
            })
            .catch(function(e){ 
                res.status(500).json({error:e})
            })
    })
    })
   
module.exports=router
