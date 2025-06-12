import type { Hash } from "@/core/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useHashes = () => {
    const [hashes, setHashes] = useState<Hash[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const response = await fetch("/api/cloudflare");
                const data = await response.json();
                setHashes(data.result || []);
            } catch (error) {
                toast.error("Error loading hashes");
                console.error(error);
            }
        };
        fetchRules();
    }, []);

    const createHash = async (hash: Hash) => {
        try {
            setLoading(true);
            const res = await fetch("/api/cloudflare", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(hash),
            });

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

    const deleteHash = async (id: string, auth: string) => {
        try {
            setLoading(true);
            const res = await fetch("/api/cloudflare", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, authentication: auth }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error("Error deleting: " + data.message);
                return false;
            }

            setHashes((prev) => prev.filter((r) => r.id !== id));
            toast.success("Hash successfully deleted.");
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
        createHash,
        deleteHash,
    };
};
