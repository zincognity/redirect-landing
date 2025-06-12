import type { Hash } from "@/core/types";
import { createHash, deleteHash, getHashesList } from "@/services/page-rules";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "./use-session";

export const useHashes = () => {
    const [hashes, setHashes] = useState<Hash[]>([]);
    const [loading, setLoading] = useState(false);
    const { token } = useSession();

    useEffect(() => {
        const fetchHashes = async () => {
            try {
                if (!token) return;
                const response = await getHashesList(token);
                const data = await response.json();
                setHashes(data);
            } catch (error) {
                toast.error("Error loading hashes");
                console.error(error);
            }
        };
        fetchHashes();
    }, [token]);

    const saveHash = async (hash: Hash) => {
        try {
            if (!token) return;
            setLoading(true);

            const res = await createHash(token, hash);
            const data = await res.json();

            if (!res.ok) {
                toast.error(
                    data.message || data.errors?.[0]?.message || "Error"
                );
                return false;
            }

            setHashes((prev) => [...prev, hash]);
            toast.success("Redirect created successfully.");
            return true;
        } catch (error) {
            toast.error("Network error while trying to save the redirect");
            console.error("Network error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeHash = async (id: string) => {
        try {
            if (!token) return;
            setLoading(true);
            const res = await deleteHash(token, id);

            const data = await res.json();

            if (!res.ok) {
                toast.error("Error deleting: " + data.message);
                return false;
            }

            setHashes((prev) => prev.filter((r) => r.id !== id));
            toast.success(data);
            return true;
        } catch (error) {
            toast.error("Network error while deleting");
            console.error(error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        hashes,
        setHashes,
        loading,
        saveHash,
        removeHash,
    };
};
