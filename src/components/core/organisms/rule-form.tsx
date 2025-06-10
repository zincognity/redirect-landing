import { site } from "@/core/config";
import type { PageRule } from "@/core/types";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PageRuleForm() {
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

        const pageRule: PageRule = {
            actions: [
                {
                    id: "forwarding_url",
                    value: {
                        status_code: 301,
                        url: url.trim(),
                    },
                },
            ],
            targets: [
                {
                    constraint: {
                        operator: "matches",
                        value: redirectFrom,
                    },
                    target: "url",
                },
            ],
            priority: 1,
            status: "active",
            authentication: auth,
        };

        try {
            const res = await fetch("/api/cloudflare", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pageRule),
            });

            if (!res.ok) {
                const err = await res.json();
                console.error("Error:", err);
                toast.error(err.message || err.errors[0].message);
                return;
            }

            localStorage.setItem("authCode", auth);
            toast.success("Redirect created successfully.");
            setTimeout(() => location.reload(), 1000);
        } catch (err) {
            console.error("Network error:", err);
            localStorage.removeItem("authCode");
            toast.error("Network error while trying to save the redirect");
        }
        window.location.reload();
    };

    useEffect(() => {
        const authInput = document.getElementById("auth") as HTMLInputElement;
        authInput.value = localStorage.getItem("authCode") ?? "";
    });

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
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
}
