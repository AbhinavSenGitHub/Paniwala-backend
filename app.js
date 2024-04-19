const express = require('express');
const  CheckoutData  = require('./mongoDB');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET, POST', // Allow only GET and POST requests
    optionsSuccessStatus: 200 // Set the preflight success status code
  };
  
app.use(cors(corsOptions));

// Configure NodeMailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'senabhinav542@gmail.com',
        pass: 'foclwkgslssrcyto'
    }
});

function generateOrderID() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
app.post('/api/checkout', async (req, res) => {
    console.log("checkout api"); 
    try {
        const formData = new CheckoutData(req.body);
        const savedData = await formData.save();

        if (formData.payment_method === 'cash') {
            const orderId = formData._id.toString();
            console.log("cash:- ", formData.email)
            const orderId6 = generateOrderID()
            const emailOptions = {
                from: 'abhinavsen413@gmail.com',
                to: formData.email,
                subject: 'Order Confirmation',
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Order Confirmation</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f2f2f2;
                            margin: 0;
                            padding: 0;
                            
                        }
                        .main{
                            height: auto;
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            /* align-items: center; */
                            /* justify-content: center; */
                        }
                        .container {
                            
                            width: 100%;
                            padding: 20px;
                            background-color: #ffffff;
                            border: 1px solid #dddddd;
                            /* border-radius: 10px; */
                            /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .header h1 {
                            color: #333333;
                            margin: 0;
                        }
                        .content {
                            font-size: 16px;
                            line-height: 1.6;
                            margin-bottom: 20px;
                        }
                        .order-id {
                            font-weight: bold;
                            color: #007bff;
                        }
                        .footer {
                            text-align: center;
                            color: #666666;
                            font-size: 14px;
                        }
                    </style>
                </head>
                <body>
                    <div class="main">
                    <div class="container">
                        <div class="">
                            <h1>Order Confirmation 🎉</h1>
                        </div>
                        <div class="content">
                            <p>Thank you 🙏 for placing your order with us. Your order has been successfully processed.</p>
                            <p>Your order ID is: <span class="order-id">${orderId6}</span></p>
                            <p>We will notify you once your order has been shipped. In the meantime, feel free to <a href="#">contact us</a> if you have any questions or concerns.</p>
                        </div>
                        <div class="footer">
                            <p>This email was sent automatically. Please do not reply.</p>
                        </div>
                    </div>
                </div>
                </body>
                </html>
                
                `
            };
            transporter.sendMail(emailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    // Handle email sending error
                } else {
                    console.log('Email sent:', info.response);
                    // Handle email sent successfully
                }
            });
            res.status(201).send({ orderId: orderId });
        }else{
            res.status(201).send(formData);
        }
        
        // Log the saved form data (optional)
        console.log("FORMDATA:-", formData);
    } catch (error) {
        // If an error occurs during saving, log the error and send a 500 status response
        console.error('Error saving form data:', error);
        res.status(500).send('Error saving form data');
    }
});
// Start server
app.listen(8080, () => {
    console.log(`Server is running on port 8080`);
  });