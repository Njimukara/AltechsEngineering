const cors = require('cors');
const express = require('express');
const clientrouter = require('./routes/clients')
const loginrouter = require('./routes/login')
const projectrouter = require('./routes/projects')
const employeerouter = require('./routes/Employee')
const commentrouter = require('./routes/comments')
const bodyParser = require('body-parser');
var models = require('./models');

const app = express();

// Middlewares
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Database initialisation
models.sequelize.sync().then(()=> {
    console.log('You are connected to the databse successfully.');
}).catch((err) => {
    console.log(err, 'There have been some problems with the database connection.')
});


app.use('/api', clientrouter)
app.use('/api', loginrouter)
app.use('/api', projectrouter)
app.use('/api', employeerouter)
app.use('/api', commentrouter)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})