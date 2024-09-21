const { config } = require('dotenv');
config();

const mongoose = require('mongoose');

let isConnected;

async function connectToDatabase() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  console.log('Establishing new database connection...');
  const db = await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = db.connections[0].readyState;
  console.log('Database connected');
}

module.exports = connectToDatabase;
