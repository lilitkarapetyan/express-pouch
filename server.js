const express = require('express')
const path = require('path')
const PouchDB = require('pouchdb').defaults({
  prefix: './db/'
})
const cors = require('cors')

const app = express()

app.use(cors())

app.use('/db', require('express-pouchdb')(PouchDB));

app.use(express.static(path.join(__dirname, '/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)

console.log('App is listening on port ' + port);
