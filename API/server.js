import app from './app.js';
import connectDB from './config/database.js';

const port = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
};

startServer();