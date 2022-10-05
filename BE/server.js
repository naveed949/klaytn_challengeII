// const env = require('dotenv');
const app = require('./app');

// env.config();
const PORT = process.env.PORT || 9090;

// starting server on given port
app.listen(PORT, function (){
    console.log('listening on port ' + PORT);
});