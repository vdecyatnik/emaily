const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());

//middleware
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === 'production'){
  //express will serve up prod assets
  //like main.js or main.css file
  app.use(express.static("client/build"));


  //express will serve up index.html file
  //if it doesnt recongnize the route

  const path = require("path");
  app.get("*", (req,res)=> {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
