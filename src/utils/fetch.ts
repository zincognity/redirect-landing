import { email, token } from "@/core/config";
import type { PageRule } from "@/core/types";

interface QueryInterface {
    name: string;
    value: string;
}

export function get(url: string, ...query: QueryInterface[]) {
    const urlQuery = new URLSearchParams();

    query.forEach((q) => {
        if (q.value) urlQuery.append(q.name, q.value);
    });

    const fullUrl = `${url}${
        query.length > 0 ? "?" + urlQuery.toString() : ""
    }`;

    return fetch(fullUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function post(url: string, body: PageRule) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Email": email,
            "X-Auth-Key": token,
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
}

export function remove(url: string, id: string) {
    return fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function update(url: string, body: unknown) {
    return fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
}

export function edit(url: string, body: unknown) {
    return fetch(url, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
}
