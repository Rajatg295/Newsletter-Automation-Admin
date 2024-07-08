const Addmembers = require('../Models/Adduser');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
exports.upload = upload;

exports.createMember = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newMember = await Addmembers.create({
            name,
            email,
            password,
            image,
            role
        });

        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Error adding user' });
    }
};

exports.getUsers=async(req,res)=>{
try{
const users=await Addmembers.find();
res.status(200).json(users);
}
catch(error){
console.error('error fetching users',error);
res.status(500).josn({error:'error fetching users'})
}
};


exports.putUsers=async(req,res)=>{
    try{
        const { id } = req.params;
        const { name, email, password, role } = req.body;  
        
        const updatedUser = await Addmembers.findByIdAndUpdate(
            id,
            { name, email, password,role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    }
    catch(error) {
        console.error('Error updating user', error);
        res.status(500).json({ error: 'Error updating user' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await Addmembers.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
};
