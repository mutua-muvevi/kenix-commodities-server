require("dotenv").config({ path: "./config.env" });
const express = require("express");

const corsMiddleware = require("./config/cors");
const helmetMiddleware = require("./config/helmet");
const compressionMiddleware = require("./config/compression");
const rateLimitMiddleware = require("./config/rate-limit");
const requestMiddleware = require("./config/compression");
const expressSanitizer = require("./config/express-sanitizer");
const databaseSanitizer = require("./config/database-sanitizer");
const connectDB = require("./config/database");

//custom module imports and initialization
const app = express();
const errorHandler = require("./middleware/error/main");

//connect to database
connectDB();

//middlewares
app.use(corsMiddleware);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(helmetMiddleware);
app.use(compressionMiddleware);
app.use(rateLimitMiddleware);
app.use(requestMiddleware);
app.use(expressSanitizer);
app.use(databaseSanitizer);

//routes
app.use("/api/user", require("./routes/user"));

//error middleware
app.use(errorHandler)

// port connections
module.exports = app;

require("./config/port")