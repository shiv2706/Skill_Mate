const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");


dotenv.config();

connectDB();

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://skill-mate-frontend.vercel.app", credentials: true }));
//app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/v1/users', require('./routes/userRoute'));
app.use('/api/v1/profile', require('./routes/profileRoutes'));
app.use('/api/v1/opportunity', require('./routes/opportunityRoutes'));
app.use('/api/v1/smartfilter', require('./routes/smartFilterRoutes'))
app.use('/api/v1/application', require('./routes/applicationRoutes'));
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});




const port =  8080 || process.env.PORT;

app.listen(port, () =>{
    console.log(`App running on port ${port}`);
})

module.exports = app;