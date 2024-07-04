const express=require('express')
const{login}=require('../Controllers/Logincontroller');

const router=express.Router();
router.post('/login',login);

module.exports=router;