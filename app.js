const express = require('express');
const logger = require('morgan');
const port = process.env.PORT || 3000;
const OAuthRoute = require('./routes/index');
const TransactionRoute = require('./routes/transaction');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(OAuthRoute);
app.use(TransactionRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.json({ code: 404, message: 'salah alamat boss!!' });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}, dude!`);
});

module.exports = app;
