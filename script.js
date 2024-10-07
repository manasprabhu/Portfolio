const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Email configurations
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Your Gmail
        pass: 'your-email-password',  // App password (if 2FA is on)
    },
});

// Handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, subject, details } = req.body;
    
    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',  // Your Gmail to receive notifications
        subject: `New Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nDetails: ${details}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.send('Email sent successfully');
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});