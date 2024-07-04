const express = require('express');
const { createMember, upload, getUsers, putUsers } = require('../controllers/Adduser');

const router = express.Router();

router.post('/registeruser', upload.single('image'), createMember);
router.get('/users',getUsers);
router.put('/users/:id',putUsers);

module.exports = router;
