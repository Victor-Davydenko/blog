import 'dotenv/config';

import { app } from './server.js';
import { startDB } from './db/startDB.js';

const PORT = process.env.PORT || 3001;

const startApp = () => {
  try {
    app.listen(PORT, async () => {
      await startDB();
      console.log(`App successfully started on ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
