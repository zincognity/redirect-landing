import { useHashesContext } from "@/contexts/hashes-context";
import { useSession } from "@/hooks/use-session";
import { RuleItem } from "../atoms/rule-item";

export const RuleList = () => {
    const { hashes, loadMore, hasMore, loading } = useHashesContext();
    const { token } = useSession();

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6 space-y-4">
            <div className="flex justify-between px-2">
                <h2 className="text-sm font-semibold text-zinc-400 uppercase w-1/2">
                    Target
                </h2>
                <h2 className="text-sm font-semibold text-zinc-400 uppercase w-1/2">
                    Redirects to
                </h2>
            </div>

            {hashes.length > 0 ? (
                hashes.map((hash) => <RuleItem key={hash.id} hash={hash} />)
            ) : token ? (
                <p className="text-sm text-zinc-400 italic">
                    No hashes have been created yet.
                </p>
            ) : (
                <p className="text-sm text-zinc-400 italic">
                    You're not logged in. Please sign in to view your hashes.
                </p>
            )}

            {loading && (
                <p className="text-sm text-zinc-400 italic">
                    Loading shashes...
                </p>
            )}

            {hasMore && (
                <button
                    onClick={loadMore}
                    className="w-full text-sm text-zinc-300 hover:underline mt-4"
                >
                    Load more
                </button>
            )}
        </div>
    );
};
