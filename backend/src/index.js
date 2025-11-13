import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/auth.route.js';
import BlogRoutes from './routes/blog.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://blog-platform-lwzn.vercel.app/" 
    ],
    credentials: true,
  })
);

const port = process.env.PORT;

app.use('/api/auth', AuthRoutes);
app.use('/api/blog', BlogRoutes);

connectDB();

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
