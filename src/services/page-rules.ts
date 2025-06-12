import type { Hash } from "@/core/types";
import { get, post, remove } from "@/utils/fetch";

interface Pagination {
    page: number;
    limit: number;
}

export async function getHashesList(
    token: string,
    { page, limit }: Pagination
) {
    const response = await get(
        token,
        `http://localhost:8080/api/v1/hashes/current`,
        ...[
            { name: "page", value: page },
            { name: "limit", value: limit },
        ]
    );
    return response;
}

export function createHash(token: string, body: Hash) {
    return post(token, `http://localhost:8080/api/v1/hashes`, body);
}

export function deleteHash(token: string, id: string) {
    return remove(token, `http://localhost:8080/api/v1/hashes`, id);
}
