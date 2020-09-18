const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users.routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || '8080'
require('dotenv/config');

const app = express();
app.use(bodyParser.json());
/**
 * By inserting cors in to the middleware the transaction of data between differnt APIs in different domains are allowed
 */
app.use(cors())
/**
 * We can use the subleveling of the routers or nested routing with the use of middleware
 */
app.use('/users', usersRouter);

/**
 * BodyParser is used to converting the response to JSOn format by acting as the middleware
 */


/**
 * Middleware
//  */
// app.use('/users', (req,res,next)=>{
//   console.log('Middleware is running on the homepage');
//   /**
//    * Use next() to render the response, otherwise it will be infintely in the middleware
//    */
//   next();
// });

/**
 * Routes: Straight routing without subleveling the routes
 */
// app.get('/', (req, res)=>{
//     res.send('We are on the home page');
//     console.log("Home Page");
// });

// app.post('/users', (req, res)=>{
//     res.send('We are on the users page');
// })

/**
 * Database connection
 */
mongoose.connect(process.env.DB_CONNECTION, 
                   { 
                     useNewUrlParser: true,
                     useUnifiedTopology: true, },
                  (err)=>{
                     if(err)
                       console.log(err);
                     else 
                       console.log('Connected!');
                   })
/**
 * Start listening to the server
 */
app.listen(PORT);



