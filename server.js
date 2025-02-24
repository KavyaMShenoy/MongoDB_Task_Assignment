const express = require('express');

const connectDB = require('./config/db');

const routes = require('./routes/districtsStatesRoutes');
const { handleGenericErrors } = require('./errors/genericErrors');

const app = express();

app.use(express.json());

connectDB();

app.use('/api', routes);

app.all('*', (req, res) => {
    res.status(400).json({ message: 'End point does not exist.' });
});

app.use(handleGenericErrors);

const PORT = 6000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})