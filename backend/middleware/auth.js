import jwt from 'jsonwebtoken'
const authMiddleWare = async (req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"unAuthorize User"})
    }
try {
    const decoded_token = jwt.verify(token,process.env.JWT_secret)
    req.body.userId = decoded_token.id;
    next();
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}
export default authMiddleWare;