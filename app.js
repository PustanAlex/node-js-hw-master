const express = require('express');
const mongoose = require('mongoose');

const contactsRouter = require('./api/contacts');
const app = express();

const connectionString = 'mongodb+srv://al3x99:al3x99@clusterforhomework.jur6f2d.mongodb.net/?retryWrites=true&w=majority&appName=ClusterForHomework';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) 
.then( () => console.log('Database connection successful'))
.catch(err => {
  console.log(err)
  process.exit(1);
});


app.use(express.urlencoded ({ extended: false }));
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.get("/", async (req, res) => {
  res.json({ status: 200 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
