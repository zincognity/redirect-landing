import { useHashesContext } from "@/contexts/hashes-context";
import type { Hash } from "@/core/types";
import { useSession } from "@/hooks/use-session";

export const RuleForm = () => {
    const { saveHash, verifyHash, isUsed } = useHashesContext();
    const { token } = useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) return;
        const form = new FormData(e.currentTarget);

        const hash: Hash = {
            hash: form.get("hash") as string,
            redirectTo: form.get("url") as string,
        };

        await saveHash(hash);
    };

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        verifyHash(value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="grid md:grid-cols-3 gap-4 mb-8 text-left"
        >
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
                            isUsed === null
                                ? "border-zinc-300 focus:ring-indigo-500"
                                : !isUsed
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
                {!isUsed != null && (
                    <span
                        className={`absolute top-1/2 right-3 text-lg pointer-events-none
                            ${!isUsed ? "text-green-500" : "text-red-500"}`}
                    >
                        {isUsed == null ? "" : !isUsed ? "✓" : "✕"}
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
