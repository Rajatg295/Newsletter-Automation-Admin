const mongoose=require('mongoose');

const Adduserschema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true,
        enum:['marketing']
    }

});

const Addmembers=mongoose.model('AddMembers',Adduserschema);
module.exports=Addmembers;