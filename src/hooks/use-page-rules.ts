import type { PageRule } from "@/core/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const usePageRules = () => {
    const [rules, setRules] = useState<PageRule[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const response = await fetch("/api/cloudflare");
                const data = await response.json();
                setRules(data.result || []);
            } catch (error) {
                toast.error("Error loading rules");
                console.error(error);
            }
        };
        fetchRules();
    }, []);

    const createRule = async (rule: PageRule) => {
        try {
            setLoading(true);
            const res = await fetch("/api/cloudflare", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rule),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(
                    data.message || data.errors?.[0]?.message || "Error"
                );
                return false;
            }

            setRules((prev) => [...prev, rule]);
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

    const deleteRule = async (id: string, auth: string) => {
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

            setRules((prev) => prev.filter((r) => r.id !== id));
            toast.success("Rule successfully deleted.");
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
        rules,
        setRules,
        loading,
        createRule,
        deleteRule,
    };
};
