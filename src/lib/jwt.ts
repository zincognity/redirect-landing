import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    sub: string;
    exp: number;
    [key: string]: any;
};

export const getDecodedToken = (token: string): JwtPayload | null => {
    try {
        return jwtDecode<JwtPayload>(token);
    } catch {
        return null;
    }
};
