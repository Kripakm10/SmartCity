var express=require('express');
var router=express.Router();
var userModel=require('../model/user');

//api for signup
router.post('/s',async(req,res)=>{
    try {
        console.log(req.body)
        await userModel(req.body).save();
        res.status(200).send({message:"User added successfully"})
    } catch (error) {
        console.log(error)
       res.status(500).send({message:"Something went wrong"}) 
    }
})

//api for login
router.post('/',async(req,res)=>{
    try {
        const user=await userModel.findOne({Email:req.body.Email})
        if(!user){
            return res.send({message:"User not found"})
        }
        if(user.Password===req.body.Password){
            return res.status(200).send({message:`Welcome ${user.role}`,user})
        }
        return res.send({message:"Invalid password"})
    } catch (error) {
        res.status(500).send({message:"Something went wrong"})
    }})
module.exports=router;