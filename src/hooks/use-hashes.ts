import type { Hash } from "@/core/types";
import { createHash, deleteHash, getHashesPage } from "@/services/page-rules";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "./use-session";

const PAGE_SIZE = 20;

export const useHashes = () => {
    const [hashes, setHashes] = useState<Hash[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { token } = useSession();

    const fetchHashes = async (page: number) => {
        try {
            if (!token) return;
            setLoading(true);

            const response = await getHashesPage(token, {
                page,
                limit: PAGE_SIZE,
            });
            const data: Hash[] = await response.json();

            setHashes((prev) => [...prev, ...data]);
            setHasMore(data.length === PAGE_SIZE);
        } catch (error) {
            toast.error("Error loading hashes");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (token) fetchHashes(page);
    }, [token, page]);

    const saveHash = async (hash: Hash) => {
        try {
            if (!token) return;
            setLoading(true);

            const res = await createHash(token, hash);
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return false;
            }

            setHashes((prev) => [...prev, hash]);
            toast.success(data.message);
            return true;
        } catch (error) {
            toast.error("Network error while trying to save the redirect");
            console.error(error);
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
        loading,
        hasMore,
        loadMore,
        saveHash,
        removeHash,
    };
};
