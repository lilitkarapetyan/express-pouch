/* pouchdb view management
 */

const emit = () => {}

// declare the views
const views = {
  messages: {
    blue: {
      map: (doc => {
        if(doc.to === 'blue' || doc.from === 'blue')
          emit(doc.id)
      }).toString(),
    },
    red: {
      map: (doc => {
        if(doc.to === 'red' || doc.from === 'red')
          emit(doc.id)
      }).toString(),
    },
    white: {
      map: (doc => {
        if(doc.from === 'white')
          emit(doc.id)
      }).toString(),
    }
  }
}

// query couchdb views
export const query = (db, view, params) => {
  const namespace = view.split('/')[0]

  return db.query(view, params).catch(err => {
    if (!views[namespace]) throw new Error('View ' + namespace + ' is not defined.')

    // if view doesn't exist, create it, and try again
    if (err.status === 404) {
      return db.put({
        _id: '_design/' + namespace,
        views: views[namespace]
      }).then(() => (query(db, view, params)))
    }
  })
}

export default views
