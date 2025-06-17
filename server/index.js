const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));
app.listen(process.env.PORT || 5000, () => console.log(`Server on port ${process.env.PORT}`));
