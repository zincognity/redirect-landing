import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastRedirect() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const message = params.get("message");

        if (!message) return;

        toast.error(message);

        params.delete("message");

        const newUrl =
            window.location.pathname +
            (params.toString() ? `?${params.toString()}` : "");

        window.history.replaceState({}, "", newUrl);
    }, []);

    return null;
}
