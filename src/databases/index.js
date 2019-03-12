import PouchDB from 'pouchdb-browser'
import pouchdbFullSync from 'pouchdb-full-sync'
import defaultOptions from './config-default.json'
let options;

try {
 options = require('./config-local.json')
}
catch (e) {
 options = {}
}

options = {
  ...defaultOptions,
  ...options
}

PouchDB.plugin(pouchdbFullSync)

const getDb = (dbKey, optionsManual) => {

  if(!options[dbKey] && !optionsManual)
    return new PouchDB(dbKey)

  if(!optionsManual) optionsManual = {}

  const optLoc = options[dbKey] ? {...options[dbKey], ...optionsManual} : optionsManual

  const db = new PouchDB(optLoc.name || dbKey)

  if(optLoc.remote) {
    const remoteDB = new PouchDB(optLoc.remote)
    db.fullySync(remoteDB, {
      live: optLoc.live,
      retry: optLoc.retry
    })
  }
  return db
}

export default getDb
/*
db.fullySync(remoteDB, {
  live: true,
  retry: true
}).on('change', function (info) {
  // handle change
}).on('paused', function () {
  // replication paused (e.g. user went offline)
}).on('active', function () {
  // replicate resumed (e.g. user went back online)
}).on('denied', function (info) {
  // a document failed to replicate, e.g. due to permissions
}).on('complete', function (info) {
  // handle complete
}).on('error', function (err) {
  // handle error
});
*/
