const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Process the form data
app.post('/process', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    // Process the data or perform any backend tasks
    // ...

    // Return a response back to the frontend
    res.json({
        status: 'success',
        message: 'Data received successfully!'
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
