import mongoose from "mongoose";
import express from 'express';
import bodyParser from 'body-parser';
import authSubscribe from "./modules/routes";

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.API_PORT || 8082;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const main = async () => {
  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } else {
    console.error("MONGO_URI not provided in the environment variables");
    process.exit(1);
  }

  const router = express.Router();
  app.use('/', authSubscribe(router));

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
