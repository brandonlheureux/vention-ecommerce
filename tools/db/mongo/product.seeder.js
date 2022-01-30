import { Mongoose } from 'mongoose';
import { config } from 'dotenv';
config();

(async () => {
  const mongoose = new Mongoose({});
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log(mongoose.connections);
  await mongoose.disconnect();
})();
