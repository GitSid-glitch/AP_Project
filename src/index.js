const express = require('express');
const cors = require('cors');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student'); 

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({
  origin: [
    "https://ap-project1.vercel.app/",
    "http://localhost:3002" 
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('CRITICAL ERROR:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
