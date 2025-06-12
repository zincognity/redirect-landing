import { getDecodedToken } from "@/lib/jwt";
import { useEffect, useState } from "react";

export type JwtPayload = {
    sub: string;
    exp: number;
    iat?: number;
    [key: string]: any;
};

export const useSession = () => {
    const [token, setToken] = useState<string | null>(null);
    const [decoded, setDecoded] = useState<JwtPayload | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("jwt");
        if (storedToken) {
            setToken(storedToken);
            decodeToken(storedToken);
        }
    }, []);

    const decodeToken = (jwt: string) => {
        try {
            const decodedData = getDecodedToken(jwt);
            setDecoded(decodedData);
        } catch {
            setDecoded(null);
        }
    };

    const saveToken = (newToken: string) => {
        localStorage.setItem("jwt", newToken);
        setToken(newToken);
        decodeToken(newToken);
    };

    const removeToken = () => {
        localStorage.removeItem("jwt");
        setToken(null);
        setDecoded(null);
    };

    const isAuthenticated = Boolean(token);

    const isExpired = () => {
        if (!decoded?.exp) return false;
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    };

    return {
        token,
        decoded,
        isAuthenticated,
        isExpired,
        saveToken,
        removeToken,
    };
};
