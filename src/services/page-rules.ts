import { zoneId } from "@/core/config";
import type { Hash } from "@/core/types";
import { get, post, remove, update } from "@/utils/fetch";

export async function getHashesList(token: string) {
    const response = await get(
        token,
        `https://localhost:8080/api/v1/hashes/current`
    );
    return response;
}

export function getRuleDetails(token: string, id: string) {
    return get(
        token,
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules/${id}`
    );
}

export function createHash(token: string, body: Hash) {
    return post(token, `https://localhost:8080/api/v1/hashes`, body);
}

export function updatePageRule(id: string, body: unknown) {
    return update(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules/${id}`,
        body
    );
}

export function editPageRule(id: string, body: unknown) {
    return update(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules/${id}`,
        body
    );
}

export function deletePageRule(id: string) {
    return remove(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules`,
        id
    );
}
