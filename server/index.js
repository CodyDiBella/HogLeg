const app = require('./app');
const db = require('./db/db');

const PORT = process.env.PORT || 3000;

db.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database', err);
  });
