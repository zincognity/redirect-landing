import { toast } from "sonner";

import { MdDelete } from "react-icons/md";

export default function DeleteButton({ id }: { id: string }) {
    const handleDelete = async () => {
        const auth = document.getElementById("auth") as HTMLInputElement;

        if (!auth.value) return toast.warning("Enter the authentication code.");

        const res = await fetch("/api/cloudflare", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, authentication: auth.value }),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Rule successfully deleted.");
            setTimeout(() => location.reload(), 1000);
        } else {
            toast.error("Error deleting: " + data.message);
        }
    };

    return (
        <div className="w-full sm:w-auto justify-center items-center flex ">
            <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Eliminar"
            >
                <MdDelete className="w-5 h-5" />
            </button>
        </div>
    );
}
