import initServer from './src/server'
import initMongoDBConnection, { ConnectConfig } from './src/frameworks/database/mongoDB/connection';
import dotenv from 'dotenv';
import { getEnv } from "./src/utils/envUtils";
dotenv.config();

const port: number = getEnv('PORT'),
    connectConfig: ConnectConfig = {
        reconnectInterval: getEnv('RECONNECT_INTERVAL'),
        mongoConnectionUri: getEnv('MONGO_CONNECTION_URI')
    }


initMongoDBConnection(connectConfig);
initServer(port);
