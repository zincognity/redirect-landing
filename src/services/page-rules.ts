import { zoneId } from "@/core/config";
import type { PageRule } from "@/core/types";
import { get, post, remove, update } from "@/utils/fetch";

export async function getListPageRules() {
    const response = await get(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules`
    );
    return response;
}

export function getRuleDetails(id: string) {
    return get(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules/${id}`
    );
}

export function createPageRule(body: PageRule) {
    return post(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules`,
        body
    );
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
