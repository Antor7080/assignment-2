import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const config = {
    database_url: process.env.URL,
    port: process.env.PORT
}

export { config };

