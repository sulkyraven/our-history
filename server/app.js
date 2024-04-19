require('dotenv').config();
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('client'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: (24 * 60 * 60 * 1000) * 7},
  store: new FileStore({ path: './server/sessions', logFn() {} })
}))

app.get('/', (req, res) => {
  res.render('index');
})

app.use('/', (req, res) => {
  res.render('error', {
    code: "404 Not Found",
    message: "Halaman yang kamu coba akses tidak dapat ditemukan",
  });
})

app.listen(process.env.PORT, () => {
  console.log(`Running! http://localhost:${process.env.PORT}`);
});