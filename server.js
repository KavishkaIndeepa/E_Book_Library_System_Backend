const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();
require('./config/db'); 

const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);


// Function to create default admin
// async function createDefaultAdmin() {
//   const adminEmail = 'kavishka1104@gmail.com';
//   const existingAdmin = await User.findOne({ email: adminEmail });

//   if (!existingAdmin) {
//     const hashedPassword = await bcrypt.hash('Admin@123', 10);
//     const adminUser = new User({
//       name: 'Admin',
//       email: adminEmail,
//       phone: '0000000000',
//       password: hashedPassword,
//       role: 'admin'
//     });
//     await adminUser.save();
//     console.log('Default admin user created');
//   } else {
//     console.log('Admin user already exists');
//   }
// }
// if (process.env.CREATE_DEFAULT_ADMIN === 'true') {
//   createDefaultAdmin();
// }

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));




