const express = require('express')
const cors = require('cors')
const BooksRouter = require('./routers/BooksRouter')
const UsersRouter = require('./routers/UsersRouter')
const app = express()

const whiteList = [
    "http://localhost:3000",
    "https://git.heroku.com/arcane-hamlet-07739.git",
];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

require('./db/mongoose')

app.use(express.json())
app.use(cors())
app.use(BooksRouter)
app.use(UsersRouter)

app.use("/", (req, res) => {
    res.send("ok");
});


module.exports = app