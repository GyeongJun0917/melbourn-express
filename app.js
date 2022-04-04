require('dotenv').config();
var cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { port, MONGO_URI } = process.env;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

app.listen(port, () => {
  console.log({"현재 시간 : ":new Date().toLocaleString()})
})
app.get('/', (req, res) => {
  res.json({"현재 시간 : ":new Date().toLocaleString()})
})
app.get('/api/now', cors(corsOptions),(req, res) => {
  res.json({"now":new Date().toLocaleString()})
})
app.post("/api/board/write", (req, res)=>{
  const {passengerId, name, team, teamId, subject} = req.body
  console.log(`넘어온 JSON 값 : ${JSON.stringify(req.body)}`)
  console.log(` passengerId 값 : ${passengerId}`)
  console.log(` name 값 : ${name}`)
  console.log(` team 값 : ${team}`)
  console.log(` teamId 값 : ${teamId}`)
  console.log(` subject 값 : ${subject}`)
  res.json(req.body)
})