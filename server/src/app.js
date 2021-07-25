require("dotenv").config();
require("./strategies/discord");

const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const Store = require("connect-mongo")(session);
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();

const routes = require("./routes");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extends: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 * 60 * 24 },
    resave: false,
    saveUninitialized: false,
    store: new Store({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
