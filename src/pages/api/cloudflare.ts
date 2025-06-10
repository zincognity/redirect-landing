import { authCode } from "@/core/config";
import type { PageRule } from "@/core/types";
import { createPageRule, deletePageRule } from "@/services/page-rules";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const body: PageRule = await request.json();

    const { authentication } = body;

    if (authentication != authCode)
        return new Response(JSON.stringify({ message: "Access denied" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
        });

    delete body.authentication;
    const res = await createPageRule(body);

    const data = await res.json();

    return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
    });
};

export const DELETE: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { authentication, id } = body;

    if (authentication !== authCode) {
        return new Response(JSON.stringify({ message: "Access denied" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
        });
    }

    if (!id) {
        return new Response(
            JSON.stringify({ message: "Missing page rule ID" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    try {
        const res = await deletePageRule(id);
        const data = await res.json();

        return new Response(JSON.stringify(data), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ message: "Error deleting page rule" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};
