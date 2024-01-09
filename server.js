// imports
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import "colors";
import cors from "cors";
import morgan from "morgan";

import helmet from "helmet";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";

import connectDB from "./config/db.js";

import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// mongodb connections
connectDB();

// rest objects
const app = express();

// middlewares
app.use(helmet());
app.use(xss());
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes);

//validation middleware
app.use(errorMiddleware);

// port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Node server running in ${process.env.DEV_MODE} mode on port no. ${PORT}`.bgCyan.white);
})