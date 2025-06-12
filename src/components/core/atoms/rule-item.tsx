import { pageUrl } from "@/core/config";
import type { PageRule } from "@/core/types";
import { usePageRules } from "@/hooks/use-page-rules";
import { useSession } from "@/hooks/use-session";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

interface Props {
    rule: PageRule;
}

export const RuleItem = ({ rule }: Props) => {
    const { deleteRule } = usePageRules();
    const { token } = useSession();

    const handleDelete = async () => {
        if (!token) return;
        const response = await deleteRule(rule.id!, token);
        if (!response) return toast.error("");
        toast.success("");
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-sm p-4 hover:border-indigo-500 transition flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="w-full sm:w-[40%]">
                    <ul className="list-inside text-white space-y-1 break-words">
                        {rule.targets.map((r, i) => (
                            <li key={i}>
                                {r.constraint?.value.replace(`${pageUrl}/`, "")}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full sm:w-[50%]">
                    <ul className="list-inside text-indigo-400 space-y-1 break-words">
                        {rule.actions.map((r, i) => (
                            <li key={i}>
                                <a
                                    href={rule.targets[0]?.constraint?.value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    {r.value.url}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full sm:w-auto justify-center items-center flex">
                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
                    >
                        <MdDelete className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
