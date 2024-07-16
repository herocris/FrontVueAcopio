import { Link, Permission, Role } from "@/shared/interfaces/sharedInterfaces";

export interface RolePermssion {
    parametros: RolePermssionResponse;
}

export interface RolePermssionResponse {
    current_page:   number;
    data:           Role[] | Permission[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  string;
    to:             number;
    total:          number;
}

export interface FormState {
    id: number;
    name: string;
    permissions?: PermissionForm[];
}
export interface PermissionForm {
    value: string;
}

export interface PermissionParams {
    text:string
    value:string
}
