const mongoose=require('mongoose')
//Connecting with Mongodb server mongo atlas

// local server
mongoose.connect('mongodb://127.0.0.1:27017/hotel',{ 
}).then((db)=>{
    console.log("Succesfully connected to mongodb server");
},(err)=>console.log(err));


//cloud server
// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://hotel:btcROmtkt3U4eYvj@cluster0.fupik.mongodb.net/Hotel?retryWrites=true&w=majority',{ 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
//     useFindAndModify: false, 
//     useCreateIndex: true 
//   }).then((db)=>{
//       console.log("Succesfully connected to mongodb server");
//   },(err)=>console.log(err));