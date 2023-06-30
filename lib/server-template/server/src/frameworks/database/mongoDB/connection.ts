import mongoose, { ConnectOptions } from "mongoose";

interface ConnectConfig {
    reconnectInterval: number;
    mongoConnectionUri: string;
    options?: ConnectOptions;
}

const initMongoDBConnection = (config: ConnectConfig): void => {
    const connect = (): void => {
        mongoose
            .connect(config.mongoConnectionUri, config.options)
            .then(
                () => { },
                (err) => {
                    console.info('Mongodb error', err);
                }
            )
            .catch((err) => {
                console.log('ERROR:', err);
            });
    }

    //start connection
    connect();

    mongoose.connection.on('connected', () => {
        console.info('Successfully connect to MongoDB');
    });

    mongoose.connection.on('reconnected', () => {
        console.info('MongoDB reconnected');
    });

    mongoose.connection.on('error', (error) => {
        console.error(`Error in MongoDb connection: ${error}`);
        mongoose.disconnect();
    });

    mongoose.connection.on('disconnected', () => {
        console.error(
            `MongoDB disconnected! Reconnecting in ${config.reconnectInterval / 1000
            }s...`
        );
        setTimeout(() => connect(), config.reconnectInterval);
    });

}

export default initMongoDBConnection;
export { ConnectConfig }