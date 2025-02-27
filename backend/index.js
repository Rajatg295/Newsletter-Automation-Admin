const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const Loginroute = require('./Routes/Loginroute');
const Adduser = require('./Routes/Adduser');
const emailTemplateRoutes = require('./Routes/emailTemplateRoutes');
const emailRoutes = require('./Routes/emailRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/CKuploads', express.static(path.join(__dirname, 'CKuploads')));


const uploadDir = path.join(__dirname, 'CKuploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


app.use(cors({
    origin: ['http://localhost:5040', 'http://localhost:5000'],
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type'
}));

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

app.use('/api', Loginroute);
app.use('/api', Adduser);
app.use('/api', emailTemplateRoutes);
app.use('/api', emailRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
