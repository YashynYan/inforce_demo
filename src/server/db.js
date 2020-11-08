import sqlite3 from "sqlite3"

const DBSOURCE = "./sqlite3.db"


let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message)
    throw err
  }
});

export default db
