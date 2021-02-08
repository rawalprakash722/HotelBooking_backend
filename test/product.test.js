const Aila = require('../models/hotelModel');
const User=require('../models/userModel')
const Cart=require('../models/cartModel')
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/AilaDBTest';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
 
   describe('Testing for Database', () => {

   //1.Product add test
    it('addAilaTest', () => {
    const aila = {
    'ailaName': 'Golden Oak',
    'ailaPrice': '880',
    'ailaType':'Whisky',
    'ailaMl':'750'
    };
    
    return Aila.create(aila)
    .then((ailaData) => {
    expect(ailaData.ailaName).toEqual('Golden Oak');
    });
    });
   
     //2.Product delete test
    it('Testing if product is being deleted', async () => {
    const status = await Aila.deleteOne({_id:Object('603a134c0b41dd3d5c96b27b')});
    expect(status.ok).toBe(1);
   });

   //3.Product update test
   it('Testing if product is being updated', async () => {
    return Aila.findOneAndUpdate({_id :Object('606d5252d359114a08368f1c')}, 
   {$set : {ailaName:'Khukuri Rum'}})
    .then((ailaData)=>{
    expect(ailaData.ailaName).toEqual('Golden Oak')
    })
    
   });
   //4.Test registration
   it('Test to register user',async()=>{
      const user={
         "firstName":"rishavvv",
         "lastName":"dhakalll",
         "dob":"2-7-2005",
         "username":"rib1222",
         "email":"reshav1222@gmail.com",
         "password":"hello111"
      }
      return User.create(user)
      .then((userData)=>{
         expect(userData.username).toEqual("rib1222")
      })
   })

   //5.Product add test
    it('addCartTest', async() => {
    const cart = {
    'ailaId': '606d5252d359114a08368f1c',
    'userId': '607e8c6d1226e34cc8fe1b2f',
    'ailaQty':'2',
    
    };
    
    return Cart.create(cart)
    .then((cartData) => {
    expect(cartData.ailaQty).toBe(2);
    });
    });
   
     //6.Cart delete test
     it('Testing if cart is being deleted', async () => {
      const status = await Cart.deleteOne({_id:Object('607e8e31ca33cd2c98a51f11')});
      expect(status.ok).toBe(1);
     });

   
  
     //7.Product update test
     it('Testing if product is being updated', async () => {
      return Cart.findOneAndUpdate({_id :Object('607e8ebfbc1c9b49f45442df')}, 
     {$set : {ailaQty:'3'}})
      .then((cartData)=>{
      expect(cartData.ailaQty).toBe(2)
      })
      
     });

    
   })
   