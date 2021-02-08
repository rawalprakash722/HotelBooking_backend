const mongoose=require('mongoose')
const hotel=require('./hotelModel')
const cart=mongoose.model('Cart',{
    hotelId:{
        type:String,
        ref:hotel
    } ,  
    userId:
    {type:String},

    hotelQty:{
        type:Number,
    },
    hotelPrice:{
        type:Number
    }
})
module.exports=cart