import type { Hash } from "@/core/types";
import { get, post, remove } from "@/utils/fetch";

interface Pagination {
    page: number;
    limit: number;
}

export async function getHashesPage(
    token: string,
    { page, limit }: Pagination
) {
    const response = await get(
        token,
        `https://redirect-backend.incognity.link/api/v1/hashes/current`,
        ...[
            { name: "page", value: page },
            { name: "limit", value: limit },
        ]
    );
    return response;
}

export async function verifyHashName(token: string, hash: string) {
    const response = await get(
        token,
        `https://redirect-backend.incognity.link/api/v1/hashes/verify/${hash}`
    );
    return response;
}

export function createHash(token: string, body: Hash) {
    return post(
        token,
        `https://redirect-backend.incognity.link/api/v1/hashes`,
        body
    );
}

export function deleteHash(token: string, id: string) {
    return remove(
        token,
        `https://redirect-backend.incognity.link/api/v1/hashes`,
        id
    );
}
