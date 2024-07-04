const mongoose=require('mongoose');
const loginschema=new mongoose.Schema({
username:{
    type:'String',
    required:'true'
},
password:{
    type:'String',
    required:'true'
}
});

const Login=mongoose.model('Logins',loginschema);
module.exports=Login;