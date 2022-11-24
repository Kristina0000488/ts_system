const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/*let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');

    
});*/

let db = new sqlite3.Database( path.resolve(__dirname, 'db.main'), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message, '1');
    }
    console.log('Connected to the users database.');
});

/*db.serialize(() => {
    db.each(`SELECT PlaylistId as id,
                    Name as name
             FROM playlists`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
});*/

async function writeUser(name, password, role, created_at) {
  await db.serialize(() => {
    return db.run('CREATE TABLE IF NOT EXISTS Users(USR_ID INTEGER PRIMARY KEY AUTOINCREMENT, USR_NAME VARCHAR(50) NOT NULL UNIQUE, USR_PASSWORD VARCHAR(255) NOT NULL, USR_ROLE NOT NULL, USR_CREATEDAT VARCHAR(150) NOT NULL)')
      .run(`INSERT INTO Users(USR_NAME, USR_PASSWORD, USR_ROLE, USR_CREATEDAT) VALUES('admin', 'admin', 'admin', '2020-11-27T08:03:00Z')`)
      .each(`SELECT USR_NAME FROM users`, (err, row) => {
        if (err){
          console.log('err');
          throw err;
        }
        console.log(row.USR_NAME);
      });
  });
}

//writeUser()

db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
});

