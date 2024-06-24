// server.js
const express = require('express');
const app = express();
const cors = require('cors')
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000; // Define the port for the server
const dbCommunicator = require('./db.js');
// Mock Project Data


let dbComs = new dbCommunicator();
app.use((req, res, next) => {
  //UPDATE IN THE FUTURE TO ONLY ACCEPT API REQUEST FROM austen.gg
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();

  
});

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//API to get all projects


app.get('/api/projects', async (req, res) => {
  await dbComs.getProjects()
  .then(value => res.send(JSON.stringify(value)))
});

app.get('/api/project-detail', async(req, res) => {
  const docID = req.query.docID;
  if (!docID) {
    return res.status(400).json({ error: 'docID is required' });
  }

  await dbComs.getSpecificProjects(docID)
  .then(value => res.send(JSON.stringify(value)))


});


// server init
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});