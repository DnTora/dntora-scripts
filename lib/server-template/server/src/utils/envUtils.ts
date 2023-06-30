interface Envs {
    PORT: number;
    RECONNECT_INTERVAL: number;
    MONGO_CONNECTION_URI?: string;
}

const defaultEnvs: Envs = {
    PORT: 2000,
    RECONNECT_INTERVAL: 2500
}

const getEnv = (envName: string): any => {
    //checking if env exists
    const env: string | undefined = process.env[envName];
    if (env)
        return getEnvType(env);

    //checking for defaults values
    const defaultEnv: string | number | boolean | undefined = defaultEnvs[envName as keyof Envs];
    if (defaultEnv)
        return defaultEnv;

    //throw an error when env is not initialized
    throw new Error(`Environment variable ${envName} is missing!!!`);

}

const getEnvType = (env: string): any => {
    let envAsNum: any = Number(env);
    if (envAsNum)
        return envAsNum;

    if (env === 'true' || env === 'false')
        return JSON.parse(env);

    return env;
}

export { getEnv }