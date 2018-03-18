const express = require('express');

const app = express(); // calling express() creates a new express app

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('landing');
});
app.get('/campgrounds', function(req, res) {
    const campgrounds = [{name: "Forest Star", image:"https://images.unsplash.com/photo-1502795147815-88376c4e38f9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cbf011a53e614c51bd0376b1e122cbcf&auto=format&fit=crop&w=750&q=80"},
    {name: "Two Forks", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=700&q=60"},
    {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1505950476988-702d4a1af500?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dc26a44848d29601da74b5d2968b15da&auto=format&fit=crop&w=700&q=60"}
]
res.render("campgrounds", {campgrounds:campgrounds});
});

// identify what port to pay attention to
const PORT = process.env.PORT || 5000;
app.listen(PORT);

// const mongoose = require('mongoose');
// const morgan = require('morgan'); // logger
// const bodyParser = require('body-parser');
// const keys = require('./config/keys');
//
// mongoose.Promise = global.Promise;
//
// const options = {
//   useMongoClient: true,
//   autoIndex: false, // Don't build indexes
//   reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
//   reconnectInterval: 500, // Reconnect every 500ms
//   poolSize: 10, // Maintain up to 10 socket connections
//   // If not connected, return errors immediately rather than waiting for reconnect
//   bufferMaxEntries: 0
// };
// mongoose.connect('mongodb://localhost:27017/cupcaketest', options, function(err) {
//   if(err) {
//     console.log('connection error', err);
//   }
//   else {
//     console.log('connection with database successful');
//   }
// });
//
// mongoose.set("debug", true);

// app.use(morgan('dev'));
//
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//
// // ensure proper headers so client can get data
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // * is access to any client, could put actual site add
//     // this origin only impacts websites...not postman like tools that will still be able to Access
//     res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // * is any
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE");
//         return res.status(200).json({});
//     }
//     next();
// });
//
// // routes to handle
// const userRoutes = require('./api/routes/user');
// const adminRoutes = require('./api/routes/admin');
//
// app.use('/api/user', userRoutes);
// app.use('/api/admin', adminRoutes);
//
// // c!aution - set up admin routes to not require any auth for quick look in dev in postman
//
// // if reach this line, none of our routes was able to handle the request
// app.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// })
//
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     });
// })
//
//
// if (process.env.NODE_ENV === 'production') {
//   // this isn't my express route
//   app.use(express.static('client/build')); // look in client/build to match
//   // can't find it in route
//   const path = require('path'); // use this to build a path
//   app.get('*', (req, res) => {  // can't find it..route to client/build/index.html
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
