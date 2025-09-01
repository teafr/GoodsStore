const app = require('./app');
const connectDB = require('./config/db');

const port = process.env.PORT || 3000;

await connectDB();

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();