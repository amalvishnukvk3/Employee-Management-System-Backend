const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use('/api/employees', employeeRoutes);
app.get('/', (req, res) => {
    res.send('Employee Management System Backend Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
