const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed BOOLEAN)");
});

function getTasks() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tasks", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

function addTask(task) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("INSERT INTO tasks (title, completed) VALUES (?, ?)");
    stmt.run(task.title, task.completed, function(err) {
      if (err) reject(err);
      resolve({ id: this.lastID, ...task });
    });
    stmt.finalize();
  });
}

function updateTask(id, task) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("UPDATE tasks SET completed = ? WHERE id = ?");
    stmt.run(task.completed, id, function(err) {
      if (err) reject(err);
      resolve({ id, ...task });
    });
    stmt.finalize();
  });
}

function deleteTask(id) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
    stmt.run(id, function(err) {
      if (err) reject(err);
      resolve();
    });
    stmt.finalize();
  });
}

module.exports = { getTasks, addTask, updateTask, deleteTask };