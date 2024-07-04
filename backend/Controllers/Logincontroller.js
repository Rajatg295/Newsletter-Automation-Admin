const Login=require('../Models/Loginmodel');

exports.login=async(req,res)=>{
    const{username, password}=req.body;
    try{
        const user=await Login.findOne({username,password});
        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        res.status(200).json({message:'login successful', user});
    }catch(error){
        console.error('login error:',error);
        res.status(500).json({message:'server error'});
    }
};