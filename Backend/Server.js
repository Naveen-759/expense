const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const dbConnection = require("./config/dbConnection");
const cors = require("cors");

const dotenv = require("dotenv").config();

dbConnection();
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET , POST , PUT , DELETE , PATCH",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/expense-tracker", require("./routes/expenseRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
