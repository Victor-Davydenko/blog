import 'dotenv/config';

import { app } from './server.js';
import { startDB } from './db/startDB.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 3001;

const startApp = () => {
  try {
    app.listen(PORT, async () => {
      await startDB();
      logger.info(`App successfully started on ${PORT}`);
    });
  } catch (e) {
    logger.error(e.message);
  }
};

startApp();
