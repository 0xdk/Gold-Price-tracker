const { config } = require('dotenv');
config();
const mongoose = require('mongoose');

// Database connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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
};

const databaseConnection = {
  connectToDatabase,
};

module.exports = databaseConnection;
