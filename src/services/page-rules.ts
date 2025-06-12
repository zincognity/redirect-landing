import { zoneId } from "@/core/config";
import type { Hash } from "@/core/types";
import { get, post, remove, update } from "@/utils/fetch";

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

export function getRuleDetails(token: string, id: string) {
    return get(
        token,
        `http://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules/${id}`
    );
}

export function createHash(token: string, body: Hash) {
    return post(token, `http://localhost:8080/api/v1/hashes`, body);
}

export function updatePageRule(id: string, body: unknown) {
    return update(
        `http://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules/${id}`,
        body
    );
}

export function editPageRule(id: string, body: unknown) {
    return update(
        `http://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules/${id}`,
        body
    );
}

export function deleteHash(token: string, id: string) {
    return remove(token, `http://localhost:8080/api/v1/hashes`, id);
}
