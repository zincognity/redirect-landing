interface ImportMetaEnv extends NodeJS.ProcessEnv {
    CLOUDFLARE_TOKEN: string;
    CLOUDFLARE_EMAIL: string;
    ZONE_ID: string;
    AUTH_CODE: string;
    PUBLIC_URL: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
}

interface ImportMeta {
    env: ImportMetaEnv;
}
