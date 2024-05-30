var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var logger = require('morgan');
var cors = require("cors");
const Cookieconfig = require("../api/utils/config/config_token")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// create connection with the db -> in develop we can use force for drop existing table and re-sync db
const db = require("./models");
const Role = db.role
const roles = db.ROLES

// code for develop time
/*
db.sequelize.sync({force: true})
    .then(() =>{
      console.log("Drop and re-sync  db.");
    })
    .catch((err) =>{
      console.log("Failed to sync db: " + err.message);
    });
*/
// code for production time
db.sequelize.sync()
    .then(() =>{
        console.log("Synced db.");
        // function for create the roles
        initial()

    })
    .catch((err) =>{
      console.log("Failed to sync db: " + err.message);
    });

// function for create the roles}

function initial() {
    let i = 1
    for (const role_i of roles) {
        Role.findOrCreate({ where: {
                id: i,
                name: role_i
            }
        }).then(role => {
            if(!role){
                console.log("role= " + role_i + " already exists")
            }
        });
        i++;
    }
}



// create the middleware to stores the session data on the client within cookie
app.use(
    cookieSession({
        name: Cookieconfig.NAME_SESSION,
        keys: Cookieconfig.SECRET_KEYS,
        httpOnly: Cookieconfig.HTTP_ONLY,
        maxAge: Cookieconfig.MAX_AGE
    })
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: 'http://localhost:3000'
}));

// routes
require("./routes/istruzione.routers")(app)
require("./routes/auth.routes")(app)
require("./routes/user.routes")(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
