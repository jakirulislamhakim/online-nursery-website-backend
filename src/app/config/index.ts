import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_salt_Rounds: process.env.JWT_SALT_ROUNDS,
  jwt_access_secret_key: process.env.JWT_ACCESS_SECRET_KEY,
  jwt_refresh_secret_key: process.env.JWT_REFRESH_SECRET_KEY,
  jwt_access_exp_time: process.env.JWT_ACCESS_EXP_TIME,
  jwt_refresh_exp_time: process.env.JWT_REFRESH_EXP_TIME,
};
