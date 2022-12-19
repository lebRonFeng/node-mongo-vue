const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
app = express();

// 引入js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

mongoose.set('strictQuery', false);
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

require("./config/passport")(passport);
// passport初始化
app.use(passport.initialize());
app.get('/', (req, res) => {
    res.send('Hello World!!')
})

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/api/users", users);
app.use("/api/profiles", profiles);

const port = process.env.PORT || 5002;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})