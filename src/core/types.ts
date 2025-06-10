export interface Target {
    constraint?: {
        operator:
            | "matches"
            | "contains"
            | "equals"
            | "not_equal"
            | "not_contain";
        value: string;
    };
    target?: string;
}

export interface Action {
    id: string;
    value: {
        status_code: number;
        url: string;
    };
}

export interface PageRule {
    id?: string;
    actions: Action[];
    create_on?: string;
    modified_on?: string;
    priority: number;
    status: "active" | "disabled";
    targets: Target[];
    authentication?: string;
}

export interface PageRuleResponse {
    errors: {
        code: number;
        message: string;
        documentation_url?: string;
        source?: { pointer?: string };
    }[];
    messages: {
        code: number;
        message: string;
        documentation_url?: string;
        source?: { pointer?: string };
    }[];
    success: true;
    result: PageRule[];
}
