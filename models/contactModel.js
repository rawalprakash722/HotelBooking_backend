const mongoose=require('mongoose')

const contact=mongoose.model('Contact',{
    fullName:{
        type:String,
    },
    subject:{
        type:String,
        
    },
    email:{
        type:String,
       
    },
    message:{
        type:String,
        
    },

})
module.exports=contact