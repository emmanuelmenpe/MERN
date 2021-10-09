const express = require('express');
const cors = require('cors');


const app = express();

//settings  
app.set('port', process.env.PORT || 4000);//app agregarle el valor de PORT si existe, si no 4000

//middleware 
//se ejecutan antes que llegue a las routes
app.use(cors());
app.use(express.json());//permite al servidor entender json y formatos de strings

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));


module.exports = app;
