const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sequelize} = require('./config/db');
const router = require('./routes/index');
const path = require('path');
const upload = require('./config/upload');

const app = express();
const PORT = process.env.PORT || 3000;
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});