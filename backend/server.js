const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://lalit:mario14@catering.dnlh2db.mongodb.net/Catering?retryWrites=true&w=majority&appName=Catering")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
});

const adminSchema = new mongoose.Schema({
  adminname: String,
  adminphone: String,
  adminusername: { type: String, unique: true },
  adminpassword: String,
  adminemail: { type: String, unique: true },
});

const bookingSchema = new mongoose.Schema({
  cateringName: { type: String, required: true },
  dateSlot: { type: Date, required: true }, 
  foodType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});

const cateringSchema = new mongoose.Schema({
  area: String,
  name: String,
  address: String,
  contact: String,
  image: String,
  logo: String,
  status: String,
});

const User = mongoose.model('User', userSchema, 'Users');
const Admin = mongoose.model('Admin', adminSchema, 'admins');
const Booking = mongoose.model('Booking', bookingSchema, 'Bookings');
const Caterer = mongoose.model('Caterer', cateringSchema, 'Caterers');
const Review = mongoose.model('Review', reviewSchema, 'Reviews');

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.post('/signup', async (req, res) => {
  const { name, phone, username, password, email } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ name, phone, username, password, email });
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/adminsignup', async (req, res) => {
  const { adminname, adminphone, adminusername, adminpassword, adminemail } = req.body;

  try {
    const adminExists = await Admin.findOne({ adminemail });
    if (adminExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newAdmin = new Admin({ adminname, adminphone, adminusername, adminpassword, adminemail });
    await newAdmin.save();

    res.status(200).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/adminlogin', async (req, res) => {
  const { adminemail, adminpassword } = req.body;

  try {
    const admin = await Admin.findOne({ adminemail });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (admin.adminpassword !== adminpassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    req.session.userId = admin._id;
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/caterers', async (req, res) => {
  try {
    const caterers = await Caterer.find().exec();
    res.status(200).json(caterers);
  } catch (error) {
    console.error('Error fetching caterers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/caterers', async (req, res) => {
  const { area, name, address, contact, image, logo } = req.body;

  try {
    const newCaterer = new Caterer({ area, name, address, contact, image, logo});
    await newCaterer.save();

    res.status(200).json({ message: 'Caterer created successfully' });
  } catch (error) {
    console.error('Error creating caterer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/caterers/:id', async (req, res) => {
  const { id } = req.params;
  const { area, name, address, contact, image, logo } = req.body;

  try {
    await Caterer.findByIdAndUpdate(id, { area, name, address, contact, image, logo });

    res.status(200).json({ message: 'Caterer updated successfully' });
  } catch (error) {
    console.error('Error updating caterer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/caterers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Caterer.findByIdAndDelete(id);

    res.status(200).json({ message: 'Caterer deleted successfully' });
  } catch (error) {
    console.error('Error deleting caterer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/bookSlot', async (req, res) => {
  const { catererId, slotId } = req.body;

  try {
    const caterer = await Caterer.findById(catererId);
    if (!caterer) {
      return res.status(404).json({ message: 'Caterer not found' });
    }

    const slot = caterer.slots.id(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    slot.isBooked = true;
    await caterer.save();

    res.status(200).json({ message: 'Slot booked successfully' });
  } catch (error) {
    console.error('Error booking slot:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/submit-review', async (req, res) => {
  const { name, email, rating, review } = req.body;

  try {
    const newReview = new Review({ name, email, rating, review });
    await newReview.save();

    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().exec();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
