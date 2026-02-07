import 'dotenv/config';
export declare const config: {
    port: number;
    apiKey: string;
    apiUrl: string;
    modelName: string;
    code: string;
    frontendUrl: string;
    mongodbUri: string;
    jwtSecret: string;
    jwtRefreshSecret: string;
    googleClientId: string;
    googleClientSecret: string;
    facebookClientId: string;
    facebookClientSecret: string;
    backendUrl: string;
    stripe: {
        secretKey: string;
        publishableKey: string;
        webhookSecret: string;
        proPriceIds: {
            monthly: string;
            yearly: string;
        };
        premiumPriceIds: {
            monthly: string;
            yearly: string;
        };
    };
    databaseUrl: string;
    usePostgresForUsers: boolean;
    usePostgresForPacks: boolean;
};
