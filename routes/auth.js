const express= require('express')
const router = express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const {JWT_SECRET}= require('../config/keys')
const validator=require("validator")
router.post('/signup',(req,res)=>{
    var a=0;
    var {username,name,email,passward}=req.body
    if(!email || !name)
    {
        return res.status(422).json({error:"Please add all the fields"})
    }
    if(username.length<6)
    {
        return res.status(422).json({error:`Your username must have 6 or more characters. You have entered only ${username.length} characters.`})
    }
    if(username.length>30)
    {
        return res.status(422).json({error:`Your username must not have more than 30 characters. You have entered ${username.length} characters. `})
    }
    if(name.length>30)
    {
        return res.status(422).json({error:`Your name must not have more than 30 characters. You have entered ${name.length} characters.`})
    }
    function validate(value){
        if(validator.isStrongPassword(value, {
            minLength: 8,minLowercase:1,
            minUppercase:1, minNumbers:1, minSymbols:1
        })){
            a=1;
        }else{
            passward='';
        }
    }
    validate(passward);
    if(!passward){
        return res.status(422).json({error: "Sign up failed.Please enter a strong password"})
    }
    User.findOne({username:username})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error: "Username already taken"})
        }
    User.findOne({name:name})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Name already taken"})
        }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with this email"})
        }
    bcrypt.hash(passward,12)
    .then(hashedpassward=>{
        const roles=new User({
            username,
            email,
            passward:hashedpassward,
            name
            
        })
        roles.save()
        res.json({message:"Signed Up successfully"})
    })
    .catch(err=>{
        console.log(err);
    })
    })
    })
})
})
router.post('/signin',(req,res)=>{
    const{email,passward}=req.body
    if(!email || !passward){
        return res.status(422).json({error:"Please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(passward,savedUser.passward)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,username,name,email}=savedUser
                res.json({token,roles:{_id,username,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
module.exports = router