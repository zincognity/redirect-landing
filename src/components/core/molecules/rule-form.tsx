import { site } from "@/core/config";
import type { Hash } from "@/core/types";
import { useHashes } from "@/hooks/use-page-rules";
import { useSession } from "@/hooks/use-session";
import { toast } from "sonner";

export const RuleForm = () => {
    const { createHash } = useHashes();
    const { token } = useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const url = form.get("url") as string;
        const hash = form.get("hash") as string;
        const auth = form.get("auth") as string;

        if (!url || !url.trim()) return toast.warning("The url is required");
        if (!url.startsWith("http")) return toast.error("The url is invalid");
        if (!hash || !hash.trim()) return toast.warning("The hash is required");
        if (!auth || !auth.trim())
            return toast.warning("The auth code is required");

        const redirectFrom = `${site}/${hash.trim()}`;

        const pageRule: Hash = {
            hash: redirectFrom,
            redirectTo: url.trim(),
        };

        try {
            const res = await fetch("/api/cloudflare", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pageRule),
            });

            if (!res.ok) {
                const err = await res.json();
                toast.error(err.message || err.errors[0].message);
                return;
            }

            localStorage.setItem("authCode", auth);
            createHash(pageRule);
            toast.success("Redirect created successfully.");
        } catch {
            localStorage.removeItem("authCode");
            toast.error("Network error while trying to save the redirect");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="grid md:grid-cols-3 gap-4 mb-8 text-left"
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="url" className="text-sm text-zinc-400">
                    Link to redirect
                </label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    placeholder="https://example.com"
                    className="input"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="hash" className="text-sm text-zinc-400">
                    Hash
                </label>
                <input
                    type="text"
                    id="hash"
                    name="hash"
                    autoComplete="off"
                    placeholder="abc123"
                    className="input"
                />
                <input
                    type="text"
                    name="fakeusername"
                    style={{ display: "none" }}
                    autoComplete="off"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="auth" className="text-sm text-zinc-400">
                    Auth Code
                </label>
                <input
                    type="password"
                    id="auth"
                    name="auth"
                    autoComplete="nope"
                    placeholder="••••••••"
                    defaultValue={token || ""}
                    className="input"
                />
            </div>
            <div className="md:col-span-3 flex justify-end mt-4">
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                >
                    Save Redirect
                </button>
            </div>
        </form>
    );
};
