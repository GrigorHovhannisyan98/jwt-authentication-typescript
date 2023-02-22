export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DB: string;
            DB_USERNAME: string;
            DB_PASS: string;
            DB_HOST: string;
            DB_DIALECT: string;
            JWT_SECACCESS:string;
            JWT_SECREFRESH:string;
            SMTP_HOST:string;
            SMTP_PORT:number;
            SMTP_USER:string;
            SMTP_PASSWORD:string
            JWT_SECRET:string
            ENV: 'test' | 'dev' | 'prod';
        }
    }
}
