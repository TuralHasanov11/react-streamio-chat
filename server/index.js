const express = require('express');
const cors = require('cors');
require('./config')

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/', (req, res) => {
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));