import userModel from "../modals/userModal.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user){
           return res.json({success:false,message:"user doesn't exist"})
        }
        const passwordcheck = await bcrypt.compare(password,user.password)
        if(!passwordcheck){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
try {
    // checking if user already exist
    const exist = await userModel.findOne({email});
    if(exist){
        return res.json({success:false,message:"User already exists"})
    }
    // validating email format & strong password
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"please enter a valid email"})
    }
    if(password.length<5){
        return res.json({success:false,message:"please enter a strong password"})
    }
    // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt) 

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashPassword,
        })
    const user = await newUser.save();
    const token = createToken(user._id)
    res.json({success:true,token})

} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
    
}

}

export{loginUser,registerUser}
