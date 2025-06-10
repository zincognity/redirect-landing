interface ImportMetaEnv extends NodeJS.ProcessEnv {
    CLOUDFLARE_TOKEN: string;
    CLOUDFLARE_EMAIL: string;
    ZONE_ID: string;
    AUTH_CODE: string;
    PUBLIC_URL: string;
}

interface ImportMeta {
    env: ImportMetaEnv;
}
