require('dotenv').config();
const express = require('express');
const cors = require('cors');
const RoleMiddleware = require('./middleware/RoleMiddleware');
const connectDB = require('./config/database');
const AuthRouter = require('./routes/AuthRouter'); 
const productsRouter = require('./routes/productsRouter'); 
const attendanceRoutes = require('./routes/AttendanceRouter'); 
const CoinRouter = require('./routes/coinRoutes');
const shopRouter = require('./routes/shopRouter');
const GroupRoutes = require('./routes/GroupRoutes');


const feedbackRoutes = require('../src/routes/feedbackRouter')
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/student', CoinRouter)
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/shop', shopRouter)
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1',  RoleMiddleware(['teacher','admin']), attendanceRoutes);
app.use('/api/v1/groups',RoleMiddleware(['admin']),GroupRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});