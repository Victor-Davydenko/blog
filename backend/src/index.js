import 'dotenv/config';

import { app } from './server.js';

const PORT = process.env.PORT || 3001;

const startApp = () => {
  try {
    app.listen(PORT, () => {
      console.log(`App successfully started on ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
