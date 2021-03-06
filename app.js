const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv')
const bookRoute = require("./routes/book.js");
const userRoute = require("./routes/user.js");
const cors = require('cors');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB is connected.'));
mongoose.connection.on('error', err => console.log(`MongoDB connection error ${err.message}`));

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/api/books", bookRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Node.JS has been started on port: ${PORT}`);
});