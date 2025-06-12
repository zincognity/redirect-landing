import { useHashes } from "@/hooks/use-hashes";
import { createContext, useContext } from "react";

export const HashesContext = createContext<ReturnType<typeof useHashes> | null>(
    null
);

export const useHashesContext = () => {
    const ctx = useContext(HashesContext);
    if (!ctx)
        throw new Error(
            "useHashesContext must be used within HashesContext.Provider"
        );
    return ctx;
};
