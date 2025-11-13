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

// ✅ CORS should come BEFORE routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const port = process.env.PORT;

// ✅ Routes (AFTER middleware)
app.use('/api/auth', AuthRoutes);
app.use('/api/blog', BlogRoutes);

connectDB();

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
