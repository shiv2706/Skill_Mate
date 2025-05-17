const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nationshiv@gmail.com',
        pass:  process.env.APP_PASSWORD// not your Gmail password!
    }
});

const SendMail = async (req, res) => {
    try{
        const {to, subject, text} = req.body;
        const info = await transporter.sendMail({
            from: 'nationshiv@gmail.com', // Must match auth.user
            to,
            subject,
            text,
        });
        console.log('Message sent:', info.response);
        res.status(200).json({
            success: true,
            message: 'Email sent successfully',
        });

    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}

module.exports = {SendMail}