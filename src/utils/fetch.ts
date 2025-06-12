import { email } from "@/core/config";
import type { Hash } from "@/core/types";

interface QueryInterface {
    name: string;
    value: string;
}

export function get(token: string, url: string, ...query: QueryInterface[]) {
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
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export function post(token: string, url: string, body: Hash) {
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

export function remove(token: string, url: string, id: string) {
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
            Authorization: `Bearer ${""}`,
        },
        body: JSON.stringify(body),
    });
}

export function edit(url: string, body: unknown) {
    return fetch(url, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${""}`,
        },
        body: JSON.stringify(body),
    });
}
