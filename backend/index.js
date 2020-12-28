const express = require('express');
const cors = require('cors');
const pool = require('./database');

// TODO figure out how to retain data when execute SELECT statement in sql

const app = express();
const port = 3000;

app.use(cors());
app.get('/', (req, res) => {
  res.send({'message': 'hello world'});
});

app.get('/welcome', function (req, res) {
  res.send('Hello World 2!')
});

app.get('/insert', async (req, res) => {
  try {

    const query = 'CREATE TABLE Persons (\n' +
      '    PersonID int,\n' +
      '    LastName varchar(255),\n' +
      '    FirstName varchar(255),\n' +
      '    Address varchar(255),\n' +
      '    City varchar(255)\n' +
      ');';
    const response = (await pool.pool).query(query);
    res.json({'message': response});
  } catch (e) {
    res.json({'error': e});
  }
});

app.get('/insertdata', async (req, res) => {
  try {

    const query = 'insert into Persons(PersonID, LastName, FirstName, Address, City) values(1, "Jackson", "Andrey", "Street 2-1-3", "Madrid");';
    const response = (await pool.pool).query(query);
    res.json({'message': response});
  } catch (e) {
    res.json({'error': e});
  }
});

app.get('/select', async (req, res) => {
  try {

    const query = 'select * from Persons;';
    const response = (await pool.pool).query(query).then((data)=> console.log('data', data));
    res.status(200).json(response);
    console.log('response', response);
  } catch (e) {
    res.json({'error': e});
  }
})

app.listen(port, ()=> {
  console.log(`This app is listening at ${port}`);
});


