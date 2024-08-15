const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const contactsRouter = require('./api/contacts');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
