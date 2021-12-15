const express = require("express");
const rateLimit = require("express-rate-limit");
const apiRouter = require("./routers/api.route");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const FRONT_URL = process.env.FRONT_URL;

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
});

app.use(limiter);
app.set("trust proxy", 1);

const corsOptions = {
  origin: FRONT_URL,
  credential: true,
};
app.use(cors(corsOptions));
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
