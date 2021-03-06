// Express requires
const app = require('express')();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

DATA_FOLDER = "../cpi-bot"

app.get('/dict', async (req, res) => {
  res.status(200).json(JSON.parse(fs.readFileSync(DATA_FOLDER+'/json/dict.json')));
});

app.get('/text', async (req, res) => {
  if (!('id' in req.query)) {
    res.status(500).send("ERROR: no id argument passed"); return; }
  if (!fs.existsSync(DATA_FOLDER+'/text/'+req.query.id+'.txt')) {
    res.status(500).send("ERROR: file not found"); return; }
  res.status(200).send(fs.readFileSync(DATA_FOLDER+'/text/'+req.query.id+'.txt'));
});

app.get('/ocr', async (req, res) => {
  if (!('id' in req.query)) {
    res.status(500).send("ERROR: no id argument passed"); return; }
  if (!fs.existsSync(DATA_FOLDER+'/ocr/'+req.query.id+'.txt')) {
    res.status(500).send("ERROR: file not found"); return; }
  res.status(200).send(fs.readFileSync(DATA_FOLDER+'/ocr/'+req.query.id+'.txt'));
});

module.exports = app
