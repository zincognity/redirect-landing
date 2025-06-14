import { useHashesContext } from "@/contexts/hashes-context";
import { pageUrl } from "@/core/config";
import type { Hash } from "@/core/types";
import { MdContentCopy, MdDelete } from "react-icons/md";
import { toast } from "sonner";

interface Props {
    hash: Hash;
}

export const RuleItem = ({ hash }: Props) => {
    const { removeHash } = useHashesContext();

    const handleDelete = async () => {
        await removeHash(hash.id!);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(
                `https://incognity.link/${hash.hash}`
            );
            toast.success("URL copied");
        } catch (err) {
            console.error("Error al copiar la URL:", err);
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-sm p-4 hover:border-indigo-500 transition flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="w-full sm:w-[40%]">
                    <ul className="list-inside text-white space-y-1 break-words">
                        <li>{hash.hash.replace(`${pageUrl}/`, "")}</li>
                    </ul>
                </div>
                <div className="w-full sm:w-[50%]">
                    <ul className="list-inside text-indigo-400 space-y-1 break-words">
                        <li>
                            <a
                                href={hash.hash}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {hash.redirectTo}
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="w-full sm:w-auto justify-center items-center flex gap-2">
                    <button
                        onClick={handleCopy}
                        className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md"
                        title="Copy URL"
                    >
                        <MdContentCopy className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
                        title="Eliminar"
                    >
                        <MdDelete className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
