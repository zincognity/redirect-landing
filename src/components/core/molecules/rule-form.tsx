import { site } from "@/core/config";
import type { Hash } from "@/core/types";
import { useHashes } from "@/hooks/use-hashes";
import { useSession } from "@/hooks/use-session";
import { createHash } from "@/services/page-rules";
import { useState } from "react";
import { toast } from "sonner";

export const RuleForm = () => {
    const { saveHash } = useHashes();
    const { token } = useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) return;
        const form = new FormData(e.currentTarget);

        const url = form.get("url") as string;
        const hashValue = form.get("hash") as string;
        const auth = form.get("auth") as string;

        if (!url || !url.trim()) return toast.warning("The url is required");
        if (!url.startsWith("http")) return toast.error("The url is invalid");
        if (!hashValue || !hashValue.trim())
            return toast.warning("The hash is required");
        if (!auth || !auth.trim())
            return toast.warning("The auth code is required");

        const redirectFrom = `${site}/${hashValue.trim()}`;

        const hash: Hash = {
            hash: redirectFrom,
            redirectTo: url.trim(),
        };

        try {
            const res = await createHash(token, hash);

            if (!res.ok) {
                const err = await res.json();
                toast.error(err.message || err.errors[0].message);
                return;
            }

            saveHash(hash);
            toast.success("Redirect created successfully.");
        } catch {
            localStorage.removeItem("authCode");
            toast.error("Network error while trying to save the redirect");
        }
    };

    const [isValidTarget, setIsValidTarget] = useState<boolean | null>(null);

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setIsValidTarget(value.length >= 3);
    };

    return (
        <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="grid md:grid-cols-3 gap-4 mb-8 text-left"
        >
            {/* Campo Target con validación */}
            <div className="flex flex-col gap-1 relative">
                <label htmlFor="hash" className="text-sm text-zinc-400">
                    Target
                </label>
                <input
                    type="text"
                    id="hash"
                    name="hash"
                    autoComplete="off"
                    placeholder="abc123"
                    onChange={handleTargetChange}
                    className={`px-4 py-2 rounded-lg border text-sm transition focus:outline-none focus:ring-2
                        ${
                            isValidTarget === null
                                ? "border-zinc-300 focus:ring-indigo-500"
                                : isValidTarget
                                ? "border-green-500 focus:ring-green-500"
                                : "border-red-500 focus:ring-red-500"
                        }`}
                />
                <input
                    type="text"
                    name="fakeusername"
                    style={{ display: "none" }}
                    autoComplete="off"
                />
                {isValidTarget !== null && (
                    <span
                        className={`absolute top-1/2 right-3 text-lg pointer-events-none
                            ${
                                isValidTarget
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                    >
                        {isValidTarget ? "✓" : "✕"}
                    </span>
                )}
            </div>

            <div className="flex flex-col col-span-2 gap-1">
                <label htmlFor="url" className="text-sm text-zinc-400">
                    Link to redirect
                </label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    placeholder="https://example.com"
                    className="px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
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
