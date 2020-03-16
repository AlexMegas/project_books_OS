const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const book = require("./routes/book.js");

mongoose.set('useUnifiedTopology', true);
// mongoose
//   .connect("mongodb+srv://sasha_s:123qazWSX@loancalculatorcluster-pcekb.mongodb.net/test?retryWrites=true&w=majority",
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log('MongoDB is connected.'));

mongoose
  .connect("mongodb://localhost:27017/booksapp",
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB is connected.'));

mongoose.connection.on('error', err => console.log(`MongoDB connection error ${err.message}`));


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/api/", book);

const port = 8080;
app.listen(port, () => {
  console.log(`Node.JS is listening to the port: ${port}`);
});