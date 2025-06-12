import { useHashes } from "@/hooks/use-hashes";
import { RuleItem } from "../atoms/rule-item";

export const RuleList = () => {
    const { hashes } = useHashes();

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
            {hashes.map((hash) => (
                <RuleItem key={hash.id} hash={hash} />
            ))}
        </div>
    );
};
