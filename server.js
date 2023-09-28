// Server Requires
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const run = require("./config/dbConn");

const allowedOrigin = "http://localhost:3000";

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
};
// Global Middleware
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes setup
const authRoute = require("./routes/authRoutes");
const scamsRoute = require("./routes/scamRoutes");
const scamTypesRoutes = require("./routes/scamTypeRoutes");
const isThereRatingRoutes = require('./routes/isThereRatingRoutes');
const commandRoute = require('./routes/commandRoutes')

app.use("/auth", authRoute);
app.use("/scams", scamsRoute);
app.use("/scamtypes", scamTypesRoutes);
app.use('/isThereRating', isThereRatingRoutes);
app.use('/command', commandRoute)


// Server & MongoDB Connection
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  try {
    run();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
