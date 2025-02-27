const express = require('express');
const { createMember, upload, getUsers, putUsers, deleteUser } = require('../Controllers/Adduser');

const router = express.Router();

router.post('/registeruser', upload.single('image'), createMember);
router.get('/users',getUsers);
router.put('/users/update/:id',putUsers);
router.delete('/users/delete/:id', deleteUser);
module.exports = router;
