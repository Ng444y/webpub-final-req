const express = require('express');
const app = express();
const PORT = 3007;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let customers = [
];

let contactMessages = [];

// API to get all customers
app.get('/api/customers', (req, res) => {
    res.json(customers);
});

// API to get contact messages
app.get('/api/contact-messages', (req, res) => {
    res.json(contactMessages);
});

// Handle form submission
app.post('/customer_messages', (req, res) => {
    const customerData = {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        message: req.body.message,
        dateSent: new Date().toLocaleString(),
        marketingOption: req.body['marketing-option'],
        socialMedia: {
            facebook: !!req.body.facebook,
            instagram: !!req.body.instagram,
            x: !!req.body.x,
        },
    };

    contactMessages.push(customerData);
    customers.push(customerData); // Add new customer data to the array

    // Redirect based on the marketing option selected
    if (req.body['marketing-option'] === 'social') {
        // Check which social media option was selected
        if (req.body.facebook) {
            res.redirect('/marketing/facebook.html'); // Redirect to Facebook promotion page
        } else if (req.body.instagram) {
            res.redirect('/marketing/instagram.html'); // Redirect to Instagram promotion page
        } else if (req.body.x) {
            res.redirect('/marketing/x.html'); // Redirect to X (Twitter) promotion page
        } else {
            // Default redirection if no specific social media option is selected
            res.redirect('/marketing/facebook.html'); // Change as needed
        }
    } else if (req.body['marketing-option'] === 'email') {
        res.redirect('/marketing/email_marketing.html'); // Redirect to email marketing page
    }
    // Optionally, redirect to customer messages page
    // res.redirect('/customer_messages.html'); // Uncomment if you want to redirect
});

// Route to serve customer_messages.html
app.get('/customer_messages', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'customer_messages.html'));
});

const products = [
    { id: 1, name: 'Americano', price: 100, image: '/img-vid/menupage/coffee.jpg' },
    { id: 2, name: 'Latte', price: 120, image: '/img-vid/menupage/coffee.jpg' },
    { id: 3, name: 'Cappuccino', price: 130, image: '/img-vid/menupage/coffee.jpg' },
    { id: 4, name: 'Sweet Black', price: 120, image: '/img-vid/menupage/coffee.jpg' },
    { id: 5, name: 'Hazelnut', price: 140, image: '/img-vid/menupage/coffee.jpg' },
    { id: 6, name: 'Vanilla Latte', price: 140, image: '/img-vid/menupage/coffee.jpg' },
    { id: 7, name: 'Spanish Latte', price: 150, image: '/img-vid/menupage/coffee.jpg' },
    { id: 8, name: 'Caramel', price: 160, image: '/img-vid/menupage/coffee.jpg' },
    { id: 9, name: 'Mocha', price: 160, image: '/img-vid/menupage/coffee.jpg' },
    { id: 10, name: 'White Mocha', price: 160, image: '/img-vid/menupage/coffee.jpg' },
    { id: 11, name: 'Salted Caramel', price: 160, image: '/img-vid/menupage/coffee.jpg' },
    { id: 12, name: 'Butterscotch', price: 160, image: '/img-vid/menupage/coffee.jpg' },
    { id: 13, name: 'Dirty Biscoff', price: 160, image: '/img-vid/menupage/coffee.jpg' },
    { id: 14, name: 'Chocolate Cream', price: 170, image: '/img-vid/menupage/iceblend.jpg' },
    { id: 15, name: 'Double Strawberry', price: 170, image: '/img-vid/menupage/iceblend.jpg' },
    { id: 16, name: 'Caramel', price: 180, image: '/img-vid/menupage/iceblend.jpg' },
    { id: 17, name: 'Cookies & Cream', price: 180, image: '/img-vid/menupage/iceblend.jpg' },
    { id: 18, name: 'Chocolate Chip', price: 180, image: '/img-vid/menupage/iceblend.jpg' },
    { id: 19, name: 'Java Chip', price: 190, image: '/img-vid/menupage/iceblend.jpg' },
    { id: 20, name: 'Chocolate', price: 140, image: '/img-vid/menupage/noncoffee.jpg' },
    { id: 21, name: 'Red Velvet', price: 140, image: '/img-vid/menupage/noncoffee.jpg' },
    { id: 22, name: 'White Chocolate', price: 150, image: '/img-vid/menupage/noncoffee.jpg' },
    { id: 23, name: 'Lychee Ade', price: 150, image: '/img-vid/menupage/noncoffee.jpg' },
    { id: 24, name: 'Green Apple', price: 150, image: '/img-vid/menupage/noncoffee.jpg' },
    { id: 25, name: 'Blueberry', price: 160, image: '/img-vid/menupage/noncoffee.jpg' },
    { id: 26, name: 'Strawberry', price: 160, image: '/img-vid/menupage/noncoffee.jpg' },
    { id: 27, name: 'Matcha', price: 160, image: '/img-vid/menupage/noncoffee.jpg' },
    { id: 28, name: 'Biscoff', price: 170, image: '/img-vid/menupage/noncoffee.jpg' }
];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
