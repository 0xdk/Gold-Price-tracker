const { config } = require('dotenv');
config();
const mongoose = require('mongoose');
const uri = process.env.DATABASE_URL;
// Database connection
async function connectToDatabase() {
  try {
    await mongoose.connect(uri);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error'));
    db.once('open', () => {
      console.log('Database connection successful');
    });

    return db; //
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

module.exports = { connectToDatabase };
