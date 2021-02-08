const mongoose=require('mongoose')

const hotel=mongoose.model('Hotel',{
    hotelImage:{
        type:String,
    },
    hotelPrice:{
        type:Number,
        required:true
    },
    hotelMl:{
        type:Number,
        required:true
    },
    hotelName:{
        type:String,
        required:true
    },
    hotelType:{
        type:String,
        required:true
    },
})
module.exports=hotel