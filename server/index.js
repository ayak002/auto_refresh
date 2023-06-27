const express = require('express');
const app = express();

const port = 5000;
require('dotenv').config();

const auto_refreshRoutes = require('./routes/auto_refresh');
auto_refreshRoutes(app);

app.listen(port, () => {
    console.log(`Epytodo can be accessed at http://localhost:${port}`)
});