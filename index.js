
//  Third party libraries
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


// Environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

//  Controllers
const userController = require('./controllers/user')
const projectController = require('./controllers/project')

//  App configuration
const config = require('./config/app')[environment];

//  Check database connection.
const dbService = require('./services/db.service');
const logService = require('./services/log.service');

let app;


dbService.authenticate().then(response => {
    logService.log('Connection to the database has been established successfully')
}).catch(e => {
    logService.log('Unable to connect to the database')
});

app = express();

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userController);
app.use('/project', projectController);

if(environment != 'testing'){
    
    app.listen(config.port, () => {
        console.log(`Server running at port ${config.port}`);
        
    });
}




module.exports = app
